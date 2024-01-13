<?php
session_start();


/**
 * @param $username - aktuální uživatelské jméno
 * @param $newEmail - e-mail nového uživatele (může být prázdný)
 * @param $newUsername - nové uživatelské jméno (může být prázdné)
 * @param $newPassword - nové uživatelské heslo (může být prázdné)
 * @param $newDob - nové datum narození uživatele (může být prázdné)
 * @param $newFirstName - nové uživatelské jméno (může být prázdné)
 * @param $newLastName - nové příjmení uživatele (může být prázdné)
 * @return void - nevrací žádnou hodnotu
 *  Tato funkce načte uživatelská data ze souboru JSON, vyhledá uživatele se zadaným jménem, aktualizuje jeho data podle předaných parametrů a aktualizovaná data zapíše zpět do souboru JSON.
 */
function updateUser($username, $newEmail, $newUsername, $newPassword, $newDob, $newFirstName, $newLastName)
{
    $data = json_decode(file_get_contents('users.json'), true);

    foreach ($data as &$user) {
        if ($user['username'] === $username) {
            if ($newEmail !== '') {
                $user['email'] = $newEmail;
            }
            if ($newUsername !== '') {
                $user['username'] = $newUsername;
            }
            if ($newPassword !== '') {
                $user['password'] = hashPassword($newPassword);
            }
            if (isset($newDob) && $newDob !== '') {
                $user['dob'] = $newDob;
            }
            if (isset($newFirstName) && $newFirstName !== '') {
                $user['firstName'] = $newFirstName;
            }
            if (isset($newLastName) && $newLastName !== '') {
                $user['lastName'] = $newLastName;
            }
            break;
        }
    }

    file_put_contents('users.json', json_encode($data));
}


/**
 * @param $password - Heslo, které se má zaheslovat.
 * @return string - Zaheslované heslo.
 * Hashuje zadané heslo pomocí algoritmu BCRYPT.
 */
function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['user'])) {
        $newEmail = $_POST['new_email'] ?? '';
        $newUsername = $_POST['new_username'] ?? '';
        $newPassword = $_POST['new_password'] ?? '';
        $newDob = $_POST['new_dob'] ?? '';
        $newFirstName = $_POST['new_first_name'] ?? '';
        $newLastName = $_POST['new_last_name'] ?? '';

        $currentUser = $_SESSION['user'];

        $newUsername = ($newUsername !== '') ? $newUsername : $currentUser;

        updateUser($currentUser, $newEmail, $newUsername, $newPassword, $newDob, $newFirstName, $newLastName);
        session_regenerate_id();
        $_SESSION['user'] = $newUsername;
        header('Location: profile.php');
        exit;
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/profile.css">
    <title>My Account</title>
    <link rel="icon" href="../tools/images/icon.jpg" type="image/png">
</head>
<body>
<div class="navbar-l">
    <div class="navbar-header">
        <a class="navbar-title">PAPARAZZI</a>
        <a class="navbar-untitle">BE BEAUTY WITH US</a>
        <a href="main.php" id="home-link">HOME</a>
        <a href="shop.php" id="shop-link">BRANDS</a>
        <a href="items.php" id="faq-link">SHOP</a>
        <a href="blog.php" id="blog-link">BLOG</a>
        <a href="contacts.php" id="contact-link">CONTACTS</a>
        <a href="profile.php" id="user-link">
            <img src="../tools/images/user.svg" class="user" alt="cart icon">
        </a>
        <a href="cart.php" id="cart-link">
            <img src="../tools/images/cart-plus.svg" class="cart" alt="cart icon">
        </a>
        <a href="index.php" class="angle">
            <img src="../tools/images/angle-double-down.svg" alt="angle icon">
        </a>

    </div>
</div>

<a class="myAcc">My Account</a>
<hr class="lineacc">
<a class="account">Account Data</a>
<a class="personal">Personal Data</a>
<hr id="l1">
<hr id="l2">
<hr id="l3">
<hr id="l4">
<hr id="l5">
<?php
if(isset($_SESSION['user'])) {
    $username = $_SESSION['user'];
    $data = json_decode(file_get_contents('users.json'), true);

    $user = null;
    foreach ($data as $userData) {
        if ($userData['username'] === $username) {
            $user = $userData;
            break;
        }
    }

    if ($user) {
        echo '<p id="login">Login:<br> ' . $user['username'] . '</p>';
        echo '<p id="email">Email:<br> ' . $user['email'] . '</p>';

        if (isset($user['dob'])) {
            echo '<p id="dob" class="warning">DoB: <br>' . $user['dob'] . '</p>';
        } else {
            echo '<p id="dob" class="warning">DoB: <br>no info</p>';
        }

        if (isset($user['firstName'])) {
            echo '<p id="name" class="warning">First Name:<br> ' . $user['firstName'] . '</p>';
        } else {
            echo '<p id="name" class="warning">First Name:<br>no info</p>';
        }

        if (isset($user['lastName'])) {
            echo '<p id="lname" class="warning">Last Name: <br>' . $user['lastName'] . '</p>';
        } else {
            echo '<p id="lname" class="warning">Last Name: <br>no info</p>';
        }

        echo '<button type="button" id="editButton">Edit Information</button>';

        echo '<form method="post" action="profile.php" id="editForm" class="hidden">';
        echo '<input type="text" id="new_username" name="new_username" value="' . $user['username'] . '">';

        echo '<input type="email" id="new_email" name="new_email" value="' . $user['email'] . '">';

        echo '<label for="new_password" id="newpasw">New Password:</label>';
        echo '<input type="password" id="new_password" name="new_password">';

        echo '<input type="text" id="new_dob" name="new_dob" value="' . ($user['dob'] ?? '') . '">';

        echo '<input type="text" id="new_first_name" name="new_first_name" value="' . ($user['firstName'] ?? '') . '">';

        echo '<input type="text" id="new_last_name" name="new_last_name" value="' . ($user['lastName'] ?? '') . '">';

        echo '<button type="submit">Submit changes</button>';
        echo '</form>';

        echo '<a href="profile.php?logout=true"><button type="button" id="logout">Log out</button></a>';
    } else {
        header('Location: index.php');
        exit;
    }
}
?>

<div class="downnavbar">
    <div class="oursocial">
        <a class="social">Our socials</a>
        <a href="https://www.instagram.com/tmlknsv/" class="insta">
            <img src="../tools/images/Social%20Icons.svg" class="instaphoto" alt="instagram icon">
            Instagram
        </a>
        <a href="https://t.me/paparazzizwa" class="telega"><img src="../tools/images/SocialIcons(1).svg" class="telegaphoto" alt="telegram icon">Telegram</a>
        <a href="https://www.youtube.com/@user-pw3bd3xl9z" class="youtube"><img src="../tools/images/SocialIcons(2).svg" class="youtubephoto" alt="youtube icon">Youtube</a>
    </div>
    <div class="PAPAR">
        <a class="papara"> PAPARAZZI</a>
        <a class="bebeauty"> BE BEAUTY WITH US</a>
        <hr class="line2">
        <a class="texttext"> <p>"Paparazzi Is A Curated Parisian Fashion Haven, Offering Timeless Elegance </p>
            <p>Through Carefully Selected Chic Attire And Bold Accessories. From Casual </p>
            <p>Chic To Glamorous Ensembles, Each Piece Tells A Story, Celebrating The Art </p>
            <p>Of Self-Expression With The Essence of French Allure."</p>
        </a>
    </div>
    <div class="find">
        <a class="own">Find Your Own Style</a>
        <a class="trend">
            <p>Trending rn</p>
            <p>Dresses</p>
            <p>Designer beach bag</p>
            <p>Waist chains</p>
            <p>Airport outfit</p>
        </a>
    </div>
</div>

<script src="../js/profile.js"></script>
</body>
</html>
