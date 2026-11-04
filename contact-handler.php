<?php
/**
 * SNT ENTERPRISES — CONTACT FORM AJAX HANDLER
 * Validates, sanitizes, applies anti-spam measures, and dispatches mail.
 */

// Strict output as JSON
header('Content-Type: application/json; charset=UTF-8');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Method not allowed. POST required.'
    ]);
    exit;
}

// Load configuration
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : [];
$recipientEmail = !empty($config['recipient_email']) ? trim($config['recipient_email']) : '';
$minSeconds     = isset($config['min_fill_seconds']) ? (int)$config['min_fill_seconds'] : 3;

// 1. Anti-Spam: Honeypot Check
if (!empty($_POST['website_hp'])) {
    // Silently terminate for automated spam bots
    echo json_encode([
        'status'  => 'success',
        'message' => 'Thank you for your enquiry. We will get back to you shortly.'
    ]);
    exit;
}

// 2. Anti-Spam: Minimum Fill-Time Check
if (!empty($_POST['form_loaded_at'])) {
    $loadedAt = (int)$_POST['form_loaded_at'];
    $currentTime = time();
    if (($currentTime - $loadedAt) < $minSeconds) {
        http_response_code(400);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Submission rejected: form completed unnaturally quickly.'
        ]);
        exit;
    }
}

// 3. Simple IP-based Rate Limiter
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateLimitMax = $config['rate_limit_max'] ?? 5;
$rateLimitWindow = $config['rate_limit_window_sec'] ?? 600;

$rateFile = sys_get_temp_dir() . '/snt_rate_' . md5($ip) . '.json';
$rateData = ['count' => 0, 'first_attempt' => time()];

if (file_exists($rateFile)) {
    $existing = json_decode(@file_get_contents($rateFile), true);
    if (is_array($existing) && isset($existing['first_attempt'], $existing['count'])) {
        if ((time() - $existing['first_attempt']) < $rateLimitWindow) {
            $rateData = $existing;
        }
    }
}

$rateData['count']++;
@file_put_contents($rateFile, json_encode($rateData));

if ($rateData['count'] > $rateLimitMax) {
    http_response_code(429);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Too many enquiries from this address. Please wait a few minutes before trying again.'
    ]);
    exit;
}

// 4. Data Extraction & Sanitization
$fullName         = isset($_POST['fullName']) ? trim(strip_tags($_POST['fullName'])) : '';
$companyName      = isset($_POST['companyName']) ? trim(strip_tags($_POST['companyName'])) : '';
$phone            = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$email            = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$materialCategory = isset($_POST['materialCategory']) ? trim(strip_tags($_POST['materialCategory'])) : '';
$location         = isset($_POST['location']) ? trim(strip_tags($_POST['location'])) : '';
$message          = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

$errors = [];

// Validate Full Name
if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors['fullName'] = 'Please enter your full name (at least 2 characters).';
}

// Validate Phone (Indian 10-digit mobile number)
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
// Check if 10 digits or 12 digits starting with 91
if (empty($cleanPhone) || (strlen($cleanPhone) === 10 && !preg_match('/^[6789]\d{9}$/', $cleanPhone)) || (strlen($cleanPhone) === 12 && !preg_match('/^91[6789]\d{9}$/', $cleanPhone))) {
    $errors['phone'] = 'Please enter a valid 10-digit Indian phone number.';
}

// Validate Email (optional, but if provided must be valid)
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}

// Validate Material Category
$allowedCategories = [
    'Aluminium Scrap',
    'Copper & Brass Scrap',
    'Stainless Steel Scrap',
    'Electrical & Mechanical Scrap',
    'Ferrous Metal Scrap',
    'Other Industrial Scrap'
];

if (empty($materialCategory) || !in_array($materialCategory, $allowedCategories, true)) {
    $errors['materialCategory'] = 'Please select a valid material category.';
}

// Validate Message
if (empty($message) || mb_strlen($message) < 5) {
    $errors['message'] = 'Please enter a message regarding your enquiry (at least 5 characters).';
}

// Return validation errors if any
if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Validation error. Please verify the highlighted fields.',
        'errors'  => $errors
    ]);
    exit;
}

// 5. Verification of Destination Email Configuration
if (empty($recipientEmail)) {
    // Client has not supplied destination email address yet in config.php
    error_log('[SNT Enterprises] Warning: Contact form enquiry received but recipient_email is empty in config.php');
    http_response_code(503);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Email dispatch is not configured yet. Please configure recipient_email in config.php.'
    ]);
    exit;
}

// 6. Send Email Notification
$subject = ($config['subject_prefix'] ?? '[SNT Enquiry] ') . $materialCategory . ' - ' . $fullName;

$body = "SNT ENTERPRISES — NEW WEBSITE ENQUIRY\n";
$body .= "========================================\n\n";
$body .= "Full Name:         " . $fullName . "\n";
if (!empty($companyName)) {
    $body .= "Company Name:      " . $companyName . "\n";
}
$body .= "Phone Number:      " . $phone . "\n";
if (!empty($email)) {
    $body .= "Email Address:     " . $email . "\n";
}
$body .= "Material Category: " . $materialCategory . "\n";
if (!empty($location)) {
    $body .= "Location:          " . $location . "\n";
}
$body .= "\nMessage:\n" . $message . "\n\n";
$body .= "========================================\n";
$body .= "Submitted At: " . date('Y-m-d H:i:s T') . "\n";
$body .= "Sender IP:    " . $ip . "\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: noreply@sntenterprises.com';
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $email;
}

$mailSent = @mail($recipientEmail, $subject, $body, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Thank you for your enquiry. We will get back to you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Server could not send the email at this time. Please contact us directly.'
    ]);
}

