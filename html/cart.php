<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/cart.css">
    <title>Buy it</title>
    <link rel="icon" href="../tools/images/icon.jpg" type="image/png">
</head>

<body>

<img src="../tools/images/Vector38.png" class="vec" alt="">
<a class="order">YOUR ORDERS:</a>
<div class="container">
    <div id="cartItems">
        <div class="cart-item">item 1</div>
        <div class="cart-item">item 2</div>
    </div>
    <p class="total">Total Price: $<span id="totalPrice">0</span></p>
    <button id="checkoutButton">Checkout</button>
    <form action="main.php" method="get">
        <button type="submit" id="main">main page</button>
    </form>
</div>
<div class="time">
    <a class="days">Order will be delivered in 3 days</a>
    <a class="date">Today is:</a>
    <?php
    /**
     * Vypíše aktuální datum
     */
        //echo '<hr>';
    $currentDate = date("m.d.Y");
    echo '<span class="times">' . $currentDate . '</span>';
    ?>
</div>
<script defer src="../js/cart.js"></script>

</body>

</html>
