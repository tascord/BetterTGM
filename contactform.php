<?php

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailFrom = $_POST['mail'];
    $messgae = $_POST['message'];

    $mailTo = "matthewtgm120@gmail.com"
    $headers = "From: ".$mailFrom;
    $txt = "You have received an email from your websites contact form. this is from ".$mailFrom.".\n\n".$messgae;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: index.php?mailsend")
}