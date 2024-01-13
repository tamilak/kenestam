<?php

/**
 * přesměruje na zadanou stránku pomocí hlavičky Location a ukončí skript.
 * @param $page - dresa stránky, na kterou chcete přesměrovat.
 * @return void - nevrací žádnou hodnotu
 */
function redirectTo($page) {
    header("Location: $page");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["register"])) {
        redirectTo("../html/register.php");
    } elseif (isset($_POST["login"])) {
        redirectTo("../html/login.php");
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/first.css">
    <title>identification</title>
    <link rel="icon" href="../tools/images/icon.jpg" type="image/png">
</head>
<body>
<p class="backtext"> PAPARAZZI </p>
<p class="welcome"> WELCOME IN MY BLOG</p>
<img src="../tools/images/Vector35.svg" class="backimg" alt="">

<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <button type="submit" name="login">login</button><br>
    <button type="submit" name="register">register</button>
</form>
</body>
</html>
