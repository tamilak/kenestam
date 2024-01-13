let globalCart = [];
let checkoutTab;

/**
 * vrací pole položek košíku získaných z dat webové relace. Pokud nejsou k dispozici žádná data, je vráceno prázdné pole.
 * * @returns {any|*[]}
 */
function getCart() {
    const cartJSON = sessionStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}

/**
 * je funkce, která uloží aktuální stav nákupního košíku do webové relace.
 * @param cart
 */
function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

/**
 *  načte a zobrazí obsah nákupního košíku na webové stránce.
 *  Používá prvky DOM k aktualizaci informací o produktech a celkové ceně nákupního košíku. přidává položky pro každý produkt v košíku a zobrazuje jejich název, množství a cenu.
 */
function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const cart = getCart();

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <p>${item.productName} x${item.quantity}</p>
          <p>Price: $${item.productPrice * item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    const totalPrice = cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
    totalPriceElement.textContent = totalPrice;
}

/**
 *
 * funkce, která otevře nové okno prohlížeče pro zadání objednávky. Pokud je košík prázdný, zobrazí se upozornění.
 *
 */
function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert('Your cart is empty. Add items before checking out.');
        return;
    }

    checkoutTab = window.open('', '_blank', 'width=800,height=800');

    const checkoutForm = `
        <link rel="stylesheet" href="../css/checkout.css">
        <a class="checkout123">Checkout</a>
        <label for="creditCard">Credit Card:</label>
        <input type="text" id="creditCard" placeholder="Enter your credit card number">
        <br>
        <label for="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your name">
        <br>
        <label for="address">Address:</label>
        <input type="text" id="address" placeholder="Enter your address">
        <br>
        <button id="processPaymentBtn">Process Payment</button>
    `;

    checkoutTab.document.body.innerHTML = checkoutForm;

    const processPaymentButton = checkoutTab.document.getElementById('processPaymentBtn');
    processPaymentButton.addEventListener('click', processPayment);
}

/**
 * zpracovává platební údaje přijaté z formuláře pro zadání objednávky.
 */
function processPayment() {
    const creditCard = checkoutTab.document.getElementById('creditCard');
    const name = checkoutTab.document.getElementById('name');
    const address = checkoutTab.document.getElementById('address');

    if (creditCard && name && address) {
        const creditCardValue = creditCard.value;
        const nameValue = name.value;
        const addressValue = address.value;

        if (validateInputs(creditCardValue, nameValue, addressValue)) {
            alert('Payment processed successfully!');

            clearCart();

            checkoutTab.close();

            window.location.href = 'cart.php';
        } else {
            alert('Invalid inputs. Please check your information.');
        }
    } else {
        console.error('One or more elements not found.');
    }
}

/**
 * je funkce, která kontroluje platnost zadaných údajů pro platbu.
 * @param creditCard - kreditní karta uživatele (16 číslic)
 * @param name - jméno (text)
 * @param address - adresa (libovolné znaky)
 * @returns {boolean}
 * Pokud některé z těchto kritérií není splněno, zobrazí se varování a funkce vrátí false. V opačném případě je vrácena hodnota true, což znamená, že ověření proběhlo úspěšně.
 */
function validateInputs(creditCard, name, address) {
    const creditCardRegex = /^\d{16}$/;
    if (!creditCardRegex.test(creditCard)) {
        alert('Invalid credit card number. Please enter a 16-digit number.');
        return false;
    }

    if (typeof name !== 'string' || name.trim() === '') {
        alert('Invalid name. Please enter a valid name.');
        return false;
    }

    const addressRegex = /^[a-zA-Z0-9\s,.'-]+$/;
    if (typeof address !== 'string' || address.trim() === '' || !addressRegex.test(address)) {
        alert('Invalid address. Please enter a valid address.');
        return false;
    }

    return true;
}

/**
 * vymaže obsah nákupního košíku
 */

function clearCart() {
    saveCart([]);
}

document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    document.getElementById("checkoutButton").addEventListener("click", checkout);
    document.getElementById("mainLink").addEventListener("click", function() {
        window.location.href = "main.php";
    });
});