<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ini_set("SMTP", "localhost");
ini_set("smtp_port", "1025");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve and sanitize form data
    $name = filter_input(INPUT_POST, 'name',  FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject',  FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message',  FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $honeypot = $_POST['honeypot'] ?? '';

    // Check honeypot field to prevent spam
    if (!empty($honeypot)) {
        die("Spam detected.");
    }

    // Basic validation
    if ($name && $email && $subject && $message) {
        // Setup Mailhog SMTP and email details
        $to = 'admin@test.com';
        $headers = "From: $email\r\n";
        $fullMessage = "Name: $name\nEmail: $email\n\n$message";

        // Send email
        if (mail($to, $subject, $fullMessage, $headers)) {
            // Display a success message with spinning logo and redirect
            echo "<div style='text-align: center; margin-top: 50px;'>
                    <style>
                        .spinning-logo {
                            animation: spin 2s linear infinite;
                            width: 100px;
                            height: auto;
                            margin-top: 20px;
                        }
                        body{
                            background:#111;
                            color:fff;
                        }
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    </style>
                    <p>Your message has been sent successfully!</p>
                    <p>You will be redirected to the homepage shortly.</p>
                    <img src='../../img/bomar-logo-nobg.png' alt='Bomar Inc. Logo' class='spinning-logo'>
                  </div>";
            echo "<script>
                    setTimeout(function() {
                        window.location.href = '../../index.html';
                    }, 3000);
                  </script>";
            exit();
        } else {
            echo "<p>There was an error sending your message. Please try again later.</p>";
        }
    } else {
        echo "<p>Please fill all required fields.</p>";
    }
} else {
    // Redirect to the contact form if not a POST request
    header("Location: contact.html");
    exit();
}
