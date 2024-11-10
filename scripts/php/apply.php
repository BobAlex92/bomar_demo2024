<?php
ini_set("SMTP", "localhost");
ini_set("smtp_port", "1025");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");
header("Content-Type: application/json");

// Decode JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

// Check if JSON decoding was successful
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid or missing data."]);
    exit();
}

// Extract form fields from decoded JSON
$name = $data['name'] ?? '';
$dateOfBirth = $data['dateOfBirth'] ?? '';
$rateOfPay = $data['rateOfPay'] ?? '';
$payType = $data['payType'] ?? '';
$phone = $data['phone'] ?? '';
$experience = $data['experience'] ?? '';
$license = $data['license'] ?? '';
$startDate = $data['startDate'] ?? '';

// Handle array fields for equipment and experience
$equipmentExperience = "";
if (isset($data['equipmentType']) && isset($data['yearsExperience'])) {
    foreach ($data['equipmentType'] as $index => $equipment) {
        $years = $data['yearsExperience'][$index] ?? '0';
        $equipmentExperience .= "$equipment - $years years\n";
    }
}

// Email content
$subject = "New Job Application from $name";
$message = "Name: $name\n"
         . "Date of Birth: $dateOfBirth\n"
         . "Rate of Pay: $rateOfPay ($payType)\n"
         . "Phone: $phone\n"
         . "Experience: $experience years\n"
         . "License: $license\n"
         . "Earliest Start Date: $startDate\n\n"
         . "Equipment Experience:\n$equipmentExperience";

$to = "test@admin.com";  // MailHog captures emails sent to localhost
$headers = "From: no-reply@yourdomain.com";

// Send email and respond with JSON
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Application submitted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send email."]);
}
exit();
