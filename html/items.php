<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/items.css">
    <title>shop</title>
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
        <img src="../tools/images/angle-double-down.svg" class="angle" alt="angle icon">
    </div>
</div>

<div class="container">
    <div class="filters">
        <h1>Filters</h1>
        <h2>top</h2>
        <button id="topsButton">tops</button>
        <button id="jacketsButton">jackets</button>
        <h2>bottom</h2>
        <button id="skirtsButton">skirts</button>
        <button id="pantsButton">pants</button>
        <h2>set</h2>
        <button id="dressesButton">dresses</button>
    </div>

    <div class="products" id="productsContainer">
        <h2>Items</h2>
    </div>


</div>

<div class="pagination-container" id="pag">
    <button id="prevPage">&lt; Prev</button>
    <button id="pageNumbers"></button>
    <button id="nextPage">Next &gt;</button>
</div>


<div class="downnavbar">
    <div class="oursocial">
        <a class="social">Our socials</a>
        <a href="https://www.instagram.com/tmlknsv/" class="insta">
            <img src="../tools/images/Social%20Icons.svg" class="instaphoto" alt="instagram icon">
            Instagram
        </a>
        <a href="https://t.me/paparazzizwa" class="telega"><img src="../tools/images/SocialIcons(1).svg"
                                                                class="telegaphoto" alt="telegram icon">Telegram</a>
        <a href="https://www.youtube.com/@user-pw3bd3xl9z" class="youtube"><img src="../tools/images/SocialIcons(2).svg"
                                                                                class="youtubephoto" alt="youtube icon">Youtube</a>
    </div>
    <div class="PAPAR">
        <a class="papara"> PAPARAZZI</a>
        <a class="bebeauty"> BE BEAUTY WITH US</a>
        <hr class="line2">
        <a class="texttext"><p>"Paparazzi Is A Curated Parisian Fashion Haven, Offering Timeless Elegance </p>
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

<script src="../js/items.js"></script>
<script src="../js/cart.js"></script>

</body>

</html>

<?php

$productsData = [
    ['id' => 1, 'type' => 'skirts', 'name' => 'skirt 1', 'price' => 200, 'image' => '../tools/images/skirt1.jpg'],
    ['id' => 2, 'type' => 'skirts', 'name' => 'skirt 2', 'price' => 200, 'image' => '../tools/images/skirt2.jpg'],
    ['id' => 3, 'type' => 'skirts', 'name' => 'skirt 3', 'price' => 200, 'image' => '../tools/images/skirt3.jpg'],
    ['id' => 17, 'type' => 'skirts', 'name' => 'skirt 4', 'price' => 200, 'image' => '../tools/images/skirt3.jpg'],
    ['id' => 4, 'type' => 'dresses', 'name' => 'dress 1', 'price' => 300, 'image' => '../tools/images/dresss1.jpg'],
    ['id' => 5, 'type' => 'dresses', 'name' => 'dress 2', 'price' => 300, 'image' => '../tools/images/dresss2.jpg'],
    ['id' => 6, 'type' => 'dresses', 'name' => 'dress 3', 'price' => 300, 'image' => '../tools/images/dresss3.jpg'],
    ['id' => 7, 'type' => 'dresses', 'name' => 'dress 4', 'price' => 300, 'image' => '../tools/images/dresss4.jpg'],
    ['id' => 8, 'type' => 'dresses', 'name' => 'dress 5', 'price' => 300, 'image' => '../tools/images/dresss5.jpg'],
    ['id' => 9, 'type' => 'dresses', 'name' => 'dress 6', 'price' => 300, 'image' => '../tools/images/dresss6.jpg'],
    ['id' => 10, 'type' => 'tops', 'name' => 'top 1', 'price' => 100, 'image' => '../tools/images/top1.jpg'],
    ['id' => 11, 'type' => 'tops', 'name' => 'top 2', 'price' => 100, 'image' => '../tools/images/top2.jpg'],
    ['id' => 12, 'type' => 'tops', 'name' => 'top 3', 'price' => 100, 'image' => '../tools/images/top3.jpg'],
    ['id' => 13, 'type' => 'jackets', 'name' => 'jacket 1', 'price' => 300, 'image' => '../tools/images/jacket1.jpg'],
    ['id' => 14, 'type' => 'jackets', 'name' => 'jacket 2', 'price' => 300, 'image' => '../tools/images/jacket2.jpg'],
    ['id' => 15, 'type' => 'pants', 'name' => 'pants 1', 'price' => 300, 'image' => '../tools/images/pants1.jpg'],
    ['id' => 16, 'type' => 'pants', 'name' => 'pants 2', 'price' => 300, 'image' => '../tools/images/pants2.jpg'],
];

/**
 *nastavuje počet prvků zobrazených na stránce
 */
const itemsPerPage = 3;
$currentFilter = $_GET['filter'] ?? 'tops';
$currentPage = $_GET['page'] ?? 1;

$filteredProducts = array_filter(
        /**
         * Funkce kontroluje, zda typ produktu odpovídá aktuálnímu filtru.
         * Vypočítá celkový počet stránek ($totalPages) s ohledem na počet prvků na stránce.
         * Vypočítá indexy začátku a konce aktuální stránky
         * @param $product - Pole dat o produktu
         * @return bool - Vrací true, pokud produkt odpovídá aktuálnímu filtru, jinak false
        */
        $productsData, function ($product) use ($currentFilter) {
    return $product['type'] === $currentFilter;
});

$totalItems = count($filteredProducts);
$totalPages = ceil($totalItems / itemsPerPage);

$startIndex = ($currentPage - 1) * itemsPerPage;
$endIndex = $startIndex + itemsPerPage;
$currentProducts = array_slice($filteredProducts, $startIndex, itemsPerPage);


?>