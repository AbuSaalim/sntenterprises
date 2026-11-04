<?php
/**
 * SNT ENTERPRISES — CONTACT FORM CONFIGURATION
 * 
 * Set the recipient email address once client confirms where enquiries should land.
 * While empty (""), contact-handler.php will safely reject mail delivery without throwing PHP fatal errors.
 */
return [
    // Recipient email address (e.g., 'info@sntenterprises.com')
    'recipient_email'       => '',

    // Subject line prefix for incoming enquiry notifications
    'subject_prefix'        => '[SNT Enquiry] ',

    // Simple IP-based rate limiting (per IP window)
    'rate_limit_max'        => 5,
    'rate_limit_window_sec' => 600, // 10 minutes

    // Minimum seconds required to fill the form (bot detection)
    'min_fill_seconds'      => 3
];

