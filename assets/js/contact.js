/**
 * SNT ENTERPRISES — CONTACT FORM LOGIC
 * Client-side validation, Indian phone format checks, honeypot spam guard, and AJAX submission.
 * 
 * NOTE FOR STATIC-ONLY HOSTING:
 * If hosting without PHP, change `ENDPOINT_URL` to your Formspree or Web3Forms URL:
 * const ENDPOINT_URL = 'https://formspree.io/f/YOUR_FORM_ID';
 */

(function ($) {
  'use strict';

  // Endpoint configuration
  const ENDPOINT_URL = 'contact-handler.php';

  $(function () {
    const $form = $('#contactForm');
    if ($form.length === 0) return;

    // Record page load timestamp for bot fill-time check
    $('#form_loaded_at').val(Math.floor(Date.now() / 1000));

    const $alertBox = $('#formAlert');
    const $submitBtn = $('#submitBtn');
    const originalBtnText = $submitBtn.html();

    // Regex for Indian 10-digit mobile numbers (optional +91, 0, or spaces/dashes)
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear individual field errors on input
    $form.find('input, select, textarea').on('input change', function () {
      const $field = $(this);
      const $group = $field.closest('.form-group-snt');
      $group.removeClass('is-invalid');
      $field.removeAttr('aria-invalid');
    });

    // Client-side Validation function
    function validateForm() {
      let isValid = true;
      let $firstErrorField = null;

      function showError($field, msg) {
        isValid = false;
        const $group = $field.closest('.form-group-snt');
        $group.addClass('is-invalid');
        $group.find('.form-error-text').text(msg);
        $field.attr('aria-invalid', 'true');
        if (!$firstErrorField) {
          $firstErrorField = $field;
        }
      }

      // 1. Full Name (Required)
      const $fullName = $('#fullName');
      if ($.trim($fullName.val()).length < 2) {
        showError($fullName, 'Please enter your full name (minimum 2 characters).');
      }

      // 2. Phone Number (Required, Indian Mobile)
      const $phone = $('#phone');
      const cleanPhone = $.trim($phone.val()).replace(/[\s\-]/g, '');
      if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
        showError($phone, 'Please enter a valid 10-digit Indian phone number.');
      }

      // 3. Email (Optional, but validated if provided)
      const $email = $('#email');
      const emailVal = $.trim($email.val());
      if (emailVal.length > 0 && !emailRegex.test(emailVal)) {
        showError($email, 'Please enter a valid email address.');
      }

      // 4. Material Category (Required)
      const $material = $('#materialCategory');
      if (!$material.val()) {
        showError($material, 'Please select a material category.');
      }

      // 5. Message (Required)
      const $message = $('#message');
      if ($.trim($message.val()).length < 5) {
        showError($message, 'Please enter a message regarding your enquiry (minimum 5 characters).');
      }

      if ($firstErrorField) {
        $firstErrorField.focus();
      }

      return isValid;
    }

    // Form Submission Handler
    $form.on('submit', function (e) {
      e.preventDefault();

      // Reset alert container
      $alertBox.hide().removeClass('form-alert--success form-alert--error').empty();

      // Honeypot check
      if ($('#website_hp').val() !== '') {
        // Silently emulate success for bots
        $alertBox.addClass('form-alert form-alert--success').html('<i class="bi bi-check2-circle fs-5"></i><span>Thank you for your enquiry. We will get back to you shortly.</span>').show();
        $form[0].reset();
        return;
      }

      // Validate inputs
      if (!validateForm()) {
        return;
      }

      // Disable button and show sending state
      $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Enquiry...');

      // AJAX request to backend
      $.ajax({
        url: ENDPOINT_URL,
        type: 'POST',
        data: $form.serialize(),
        dataType: 'json',
        timeout: 10000
      })
      .done(function (response) {
        if (response.status === 'success') {
          $alertBox
            .addClass('form-alert form-alert--success')
            .html('<i class="bi bi-check2-circle fs-5"></i><span>' + response.message + '</span>')
            .fadeIn();
          $form[0].reset();
          $('#form_loaded_at').val(Math.floor(Date.now() / 1000));
        } else {
          $alertBox
            .addClass('form-alert form-alert--error')
            .html('<i class="bi bi-exclamation-triangle fs-5"></i><span>' + (response.message || 'Unable to send enquiry. Please try again.') + '</span>')
            .fadeIn();
        }
      })
      .fail(function (xhr) {
        let errorMsg = 'Unable to send enquiry at this time. Please try again or reach out directly.';
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMsg = xhr.responseJSON.message;
        }
        $alertBox
          .addClass('form-alert form-alert--error')
          .html('<i class="bi bi-exclamation-triangle fs-5"></i><span>' + errorMsg + '</span>')
          .fadeIn();
      })
      .always(function () {
        $submitBtn.prop('disabled', false).html(originalBtnText);
      });
    });

  });

})(jQuery);
