<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/register.css">
    <title>Registration</title>
    <link rel="icon" href="../tools/images/icon.jpg" type="image/png">
</head>
<body>
<div class="register-back">

    <h2 class="reg">REGISTRATION</h2>
    <form id="registerForm" method="post">
        <label for="username">Login:</label>
        <input type="text" id="username" name="username" required>
        <span class="error" id="usernameError"></span>
        <br>
        <label for="email">Mail:</label>
        <input type="email" id="email" name="email" required>
        <span class="error" id="emailError"></span>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <span class="error" id="passwordError"></span>
        <br>
        <label for="confirmPassword" id="passwordaagain">Confirm Password:</label>
        <input type="password"  id="confirmPassword" name="confirmPassword" required>
        <span class="error" id="confirmPasswordError"></span>
        <br>
        <a class="optional"> OPTIONAL INFORMATION:</a>
        <br>
        <label id="avatarr" for="avatar">Avatar:</label>
        <input type="file" id="avatar" name="avatar" accept="image/*">
        <span class="error" id="avatarError"></span>
        <br>
        <label for="firstName" id="fname">First Name:</label>
        <input type="text" id="firstName" name="firstName">
        <span class="error" id="firstNameError"></span>
        <br>
        <label for="lastName" id="lname">Last Name:</label>
        <input type="text" id="lastName" name="lastName">
        <span class="error" id="lastNameError"></span>
        <br>
        <h4 class="already"> Already have account? <a href="login.php" id="login">login</a></h4>
        <button type="submit" id="sing1">sign up</button>
    </form>
</div>
<img src="../tools/images/Vector35.svg" class="backimg3" alt="">
<script src="../js/register.js"></script>
</body>
</html>


