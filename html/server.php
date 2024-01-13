<?php
session_start();

/**
 * Z důvodu bezpečnosti zahesluje heslo přijaté od uživatele.
 *
 * @param string $password - Nechráněné heslo zadané uživatelem.
 * @return string - Zabezpečené, zaheslované heslo jako řetězec.
 * @throws Exception - dojde k nějaké chybě, která bude zabalena do objektu třídy Exception a vyhozena.
 */
function hashPassword($password): string
{
    return password_hash($password, PASSWORD_BCRYPT);
}


/**
 * Funkce je určena k registraci nového uživatele na základě údajů zaslaných prostřednictvím požadavku POST.
 * zahrnuje kontrolu jedinečnosti uživatelského jména a požadavků na e-mail a heslo, uložení dat do souboru a nastavení relace a souboru cookie pro nového uživatele.
 * @return void
 * @throws Exception - dojde k nějaké chybě, která bude zabalena do objektu třídy Exception a vyhozena.
 */
function registerUser()
{
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    if (!file_exists('users.json')) {
        file_put_contents('users.json', '[]');
    }

    $data = json_decode(file_get_contents('users.json'), true);

    foreach ($data as $user) {
        if ($user['username'] === $username) {
            echo json_encode(['status' => 'error', 'message' => 'user with that nickname already exist']);
            exit;
        }

        if ($user['email'] === $email) {
            echo json_encode(['status' => 'error', 'message' => 'user with that mail already exist']);
            exit;
        }
    }

    $avatarPath = '';
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../tools/avatars/';
        $avatarFileName = basename($_FILES['avatar']['name']);
        $avatarPath = $uploadDir . $avatarFileName;

        move_uploaded_file($_FILES['avatar']['tmp_name'], $avatarPath);
    }

    if (strlen($password) < 8 || !preg_match('/[A-Z]/', $password) || !preg_match('/[a-z]/', $password) || !preg_match('/[0-9]/', $password)) {
        $missingCriteria = [];

        if (strlen($password) < 8) {
            $missingCriteria[] = 'not less then 8 numbers';
        }

        if (!preg_match('/[A-Z]/', $password)) {
            $missingCriteria[] = 'at least 1 uppercase letter';
        }

        if (!preg_match('/[a-z]/', $password)) {
            $missingCriteria[] = 'at least 1 lowercase letter';
        }

        if (!preg_match('/[0-9]/', $password)) {
            $missingCriteria[] = 'at least 1 number';
        }

        $errorMessage = 'password must contain: ' . implode(', ', $missingCriteria);
        echo json_encode(['status' => 'error', 'message' => $errorMessage]);
        exit;
    }

    $hashedPassword = hashPassword($password);

    $data[] = ['username' => $username, 'email' => $email, 'password' => $hashedPassword, 'contactmail' => '', 'avatarPath' => $avatarPath];
    file_put_contents('users.json', json_encode($data, JSON_PRETTY_PRINT));

    $_SESSION['user'] = $username;

    setcookie('user', $username, time() + 3600, '/');

    echo json_encode(['status' => 'success']);
}


/**
 * funkce je určena pro proces ověřování uživatele na základě údajů přijatých prostřednictvím požadavku POST.
 *
 * Hodnoty jsou získávány z pole POST.
 * Údaje o uživateli se načítají ze souboru users.json
 * Smyčka vyhledá uživatele se zadaným jménem a zkontroluje hash hesla
 * Nastaví se relace a soubor cookie se jménem uživatele s platností 1 hodinu.
 * Pokud uživatel není nalezen nebo heslo neodpovídá, zobrazí se chybové hlášení.
 * @return void - nevrací žádnou hodnotu
 */
function loginUser()
{
    $loginUsername = $_POST['username'];
    $loginPassword = $_POST['password'];

    $data = json_decode(file_get_contents('users.json'), true);

    $userFound = false;
    $foundUser = null;

    foreach ($data as $user) {
        if ($user['username'] === $loginUsername && password_verify($loginPassword, $user['password'])) {
            $userFound = true;
            $foundUser = $user;
            break;
        }
    }

    if ($userFound) {
        $_SESSION['user'] = $foundUser['username'];

        setcookie('user', $foundUser['username'], time() + 3600, '/');

        echo json_encode(['status' => 'success', 'user' => $foundUser], JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Wrong password. Try again']);
    }
}


/**
 * Uloží nahraný soubor avatara do adresáře '../tools/avatars/'.
 * V případě úspěchu nebo chyby vrátí odpověď JSON.
 * @return void - nevrací žádnou hodnotu
 */
function saveAvatar()
{
    $avatarFile = $_FILES['avatar'];

    $uploadDir = '../tools/avatars/';
    $uploadPath = $uploadDir . basename($avatarFile['name']);

    if (move_uploaded_file($avatarFile['tmp_name'], $uploadPath)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'saving error']);
    }

    exit;
}

function subscribeUser()
{
    session_start();

    $email = $_POST['contactemail'];

    if (isset($_SESSION['user'])) {
        $loggedInUser = $_SESSION['user'];

        $data = json_decode(file_get_contents('users.json'), true);

        $userKey = array_search($loggedInUser, array_column($data, 'username'));

        if ($userKey !== false) {
            $data[$userKey]['contactemail'] = $email;

            // Save the updated data back to users.json
            file_put_contents('users.json', json_encode($data, JSON_PRETTY_PRINT));

            echo json_encode(['status' => 'success', 'message' => 'Subscription successful']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found in data']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not in session']);
    }
}

/**
 * přesměruje uživatele podle jeho požadavku
 */
$action = $_POST['action'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'register') {
        registerUser();
    } elseif ($action === 'login') {
        loginUser();
    } elseif ($action === 'saveAvatar') {
        saveAvatar();
    }elseif ($action === 'subscribe') {
        subscribeUser();
    }
}
?>
