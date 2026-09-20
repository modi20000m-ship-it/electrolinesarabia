<?php
declare(strict_types=1);

/*
 * Electrolines Arabia contact form handler.
 *
 * IMPORTANT: Replace the two example email addresses below with real
 * addresses from your website domain before publishing.
 */
const RECIPIENT_EMAIL = 'inquiries@example.com';
const SENDER_EMAIL = 'website@example.com';
const SITE_NAME = 'Electrolines Arabia';

function clean_line($value, int $maximumLength = 200): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim(str_replace(["\r", "\n", "\0"], ' ', $value));
    return substr($value, 0, $maximumLength);
}

function clean_message($value, int $maximumLength = 4000): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim(str_replace("\0", '', $value));
    return substr($value, 0, $maximumLength);
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function show_result(string $title, string $message, bool $success, int $statusCode = 200): void
{
    http_response_code($statusCode);

    $safeTitle = escape_html($title);
    $safeMessage = escape_html($message);
    $icon = $success ? '✓' : '!';
    $statusClass = $success ? 'success' : 'error';

    echo <<<HTML
<!doctype html>
<html lang="en" dir="ltr">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <title>{$safeTitle} | Electrolines Arabia</title>
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
 <style>
  :root{
   --navy:#071521;
   --ink:#102331;
   --muted:#6f8090;
   --cyan:#08bce8;
   --turquoise:#13d3c4;
   --lime:#39e63d;
   --gradient:linear-gradient(135deg,#08bce8 0%,#13d3c4 48%,#39e63d 100%);
  }
  *{box-sizing:border-box}
  body{
   margin:0;
   min-height:100vh;
   display:grid;
   place-items:center;
   padding:24px;
   color:white;
   background:
    radial-gradient(circle at 80% 15%,rgba(19,211,196,.16),transparent 34%),
    var(--navy);
   font-family:Manrope,Arial,sans-serif;
  }
  .result-card{
   width:min(560px,100%);
   padding:clamp(30px,6vw,54px);
   color:var(--ink);
   background:rgba(255,255,255,.98);
   border:1px solid rgba(255,255,255,.72);
   border-radius:28px;
   box-shadow:0 35px 90px rgba(0,0,0,.3);
   text-align:center;
  }
  .status-icon{
   width:72px;
   height:72px;
   display:grid;
   place-items:center;
   margin:0 auto 24px;
   color:#06151f;
   background:var(--gradient);
   border-radius:22px;
   font-size:2rem;
   font-weight:800;
  }
  .error .status-icon{
   color:#fff;
   background:#e64848;
  }
  .eyebrow{
   margin:0 0 10px;
   color:var(--turquoise);
   font-size:.7rem;
   font-weight:800;
   letter-spacing:.15em;
  }
  h1{
   margin:0 0 16px;
   font:700 clamp(2rem,6vw,3rem)/1.08 "Space Grotesk",sans-serif;
   letter-spacing:-.04em;
  }
  p{
   margin:0 auto 28px;
   max-width:430px;
   color:var(--muted);
   line-height:1.75;
  }
  a{
   display:inline-flex;
   align-items:center;
   justify-content:center;
   min-height:52px;
   padding:0 23px;
   color:#06151f;
   background:var(--gradient);
   border-radius:999px;
   font-size:.82rem;
   font-weight:800;
   text-decoration:none;
   box-shadow:0 12px 28px rgba(19,211,196,.22);
  }
 </style>
</head>
<body>
 <main class="result-card {$statusClass}">
  <div class="status-icon" aria-hidden="true">{$icon}</div>
  <p class="eyebrow">ELECTROLINES ARABIA</p>
  <h1>{$safeTitle}</h1>
  <p>{$safeMessage}</p>
  <a href="index.html#contact">Return to the website&nbsp; ↗</a>
 </main>
</body>
</html>
HTML;
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    show_result(
        'Invalid request',
        'Please submit your inquiry using the contact form on our website.',
        false,
        405
    );
}

// Honeypot field: bots commonly fill this hidden input.
if (clean_line($_POST['website'] ?? '') !== '') {
    show_result(
        'Thank you',
        'Your inquiry has been received successfully.',
        true
    );
}

$name = clean_line($_POST['name'] ?? '', 120);
$company = clean_line($_POST['company'] ?? '', 160);
$email = clean_line($_POST['email'] ?? '', 254);
$phone = clean_line($_POST['phone'] ?? '', 60);
$quantity = clean_line($_POST['quantity'] ?? '', 20);
$city = clean_line($_POST['city'] ?? '', 120);
$message = clean_message($_POST['message'] ?? '');
$consent = clean_line($_POST['consent'] ?? '', 10);

$allowedProducts = [
    'AiroSensor',
    'Pt100 and sealed probes',
    'AssetTag',
    'AccessPoints',
    'SACLIENT Cloud',
    'Complete solution / consultation',
];

$submittedProducts = $_POST['products'] ?? [];
$products = [];

if (is_array($submittedProducts)) {
    foreach ($submittedProducts as $product) {
        $product = clean_line($product, 100);
        if (in_array($product, $allowedProducts, true)) {
            $products[] = $product;
        }
    }
}

$products = array_values(array_unique($products));
$errors = [];

if (strlen($name) < 2) {
    $errors[] = 'Please enter your full name.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (strlen($phone) < 6) {
    $errors[] = 'Please enter a valid phone number.';
}

if ($products === []) {
    $errors[] = 'Please select at least one product.';
}

if ($quantity !== '' && (!ctype_digit($quantity) || (int) $quantity < 1)) {
    $errors[] = 'The estimated quantity must be a positive number.';
}

if ($consent !== 'yes') {
    $errors[] = 'You must agree to be contacted about this inquiry.';
}

if ($errors !== []) {
    show_result(
        'Please check your information',
        implode(' ', $errors),
        false,
        422
    );
}

$productList = implode(', ', $products);
$submittedAt = date('Y-m-d H:i:s T');
$visitorIp = clean_line($_SERVER['REMOTE_ADDR'] ?? 'Unknown', 64);

$subject = 'New product inquiry from ' . $name;
$emailBody = implode("\r\n", [
    'New product inquiry received from the Electrolines Arabia website',
    '------------------------------------------------------------',
    'Name: ' . $name,
    'Company / organization: ' . ($company !== '' ? $company : 'Not provided'),
    'Email: ' . $email,
    'Phone: ' . $phone,
    'City / region: ' . ($city !== '' ? $city : 'Not provided'),
    'Products: ' . $productList,
    'Estimated quantity: ' . ($quantity !== '' ? $quantity : 'Not provided'),
    '',
    'Project details:',
    $message !== '' ? $message : 'Not provided',
    '',
    'Submitted: ' . $submittedAt,
    'Visitor IP: ' . $visitorIp,
]);

$headers = [
    'From: ' . SITE_NAME . ' Website <' . SENDER_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail(
    RECIPIENT_EMAIL,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$sent) {
    show_result(
        'Message could not be sent',
        'The mail service is not configured yet. Please contact us directly or try again later.',
        false,
        500
    );
}

show_result(
    'Inquiry sent successfully',
    'Thank you, ' . $name . '. Our team will review your request and contact you soon.',
    true
);
