<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action === 'login') {
        handleLogin();
    }
}

/**
 * Nastaví pevně zadané platné hodnoty pro uživatelské jméno a heslo.
 * Zkontroluje, zda zadané údaje odpovídají referenčním údajům.
 *
 * Pokud zadané údaje odpovídají platným hodnotám, nastaví stav na "úspěch" a uloží uživatelské jméno do relace.
 * @return void - nevrací žádnou hodnotu
 */
function handleLogin() {
    $loginUsername = isset($_POST['username']) ? $_POST['username'] : '';
    $loginPassword = isset($_POST['password']) ? $_POST['password'] : '';

    $validUsername = 'demo';
    $validPassword = 'password';

    if ($loginUsername === $validUsername && $loginPassword === $validPassword) {
        $responseData = ['status' => 'success'];
        $_SESSION['username'] = $loginUsername; // Store username in the session
    } else {
        $responseData = ['status' => 'error', 'message' => 'Invalid username or password'];
    }

    echo json_encode($responseData);
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login.css">
    <title>Login</title>
    <link rel="icon" href="../tools/images/icon.jpg" type="image/png">
</head>
<body>
<img src="../tools/images/Vector36.png" class="backimg2" alt="">
<form id="loginForm" method="post">
    <h2 class="loghere">LOGIN</h2>
    <label for="loginUsername" id="login">login:</label>
    <input type="text" id="loginUsername" name="username" required>
    <br>
    <label for="loginPassword" id="password">password:</label>
    <input type="password" id="loginPassword" name="password" required>
    <h4 class="donthave"> Don't have account? <a href="register.php" id="singup">sign up</a></h4>
    <br>
    <button type="submit">login</button>
</form>

<script src="../js/login.js"></script>
</body>
</html>
