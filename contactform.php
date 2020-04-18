<?php
$visitor_email = $_POST['email'];
$visitor_email = $_POST['date'];
$message = $_POST['message'];

$email_from = 'no-reply@matthewtgm.ga'
$email_subject = "new contact form submission";
$email_body = "Email: $name\n".
                "Date Of Submission: $date\n"
                    "Message: $message"


$to = "matthewtgm100@gmail.com";
$headers = "From $email_from \r\n";
mail($to,$email_subject,$email_body,$headers);
header("Location: contact.html");