const productsData = [
    {id: 1, type: 'skirts', name: 'skirt 1', price: 200, image: '../tools/images/skirt1.jpg'},
    {id: 2, type: 'skirts', name: 'skirt 2', price: 200, image: '../tools/images/skirt2.jpg'},
    {id: 3, type: 'skirts', name: 'skirt 3', price: 200, image: '../tools/images/skirt3.jpg'},
    {id: 17, type: 'skirts', name: 'skirt 4', price: 200, image: '../tools/images/dresss5.jpg'},
    {id: 4, type: 'dresses', name: 'dress 1', price: 300, image: '../tools/images/dresss1.jpg'},
    {id: 5, type: 'dresses', name: 'dress 2', price: 300, image: '../tools/images/dresss2.jpg'},
    {id: 6, type: 'dresses', name: 'dress 3', price: 300, image: '../tools/images/dresss3.jpg'},
    {id: 7, type: 'dresses', name: 'dress 4', price: 300, image: '../tools/images/dresss4.jpg'},
    {id: 10, type: 'tops', name: 'top 1', price: 100, image: '../tools/images/top1.jpg'},
    {id: 11, type: 'tops', name: 'top 2', price: 100, image: '../tools/images/top2.jpg'},
    {id: 12, type: 'tops', name: 'top 3', price: 100, image: '../tools/images/top3.jpg'},
    {id: 13, type: 'jackets', name: 'jacket 1', price: 300, image: '../tools/images/jacket1.jpg'},
    {id: 14, type: 'jackets', name: 'jacket 2', price: 300, image: '../tools/images/jacket2.jpg'},
    {id: 15, type: 'pants', name: 'pants 1', price: 300, image: '../tools/images/pants1.jpg'},
    {id: 16, type: 'pants', name: 'pants 2', price: 300, image: '../tools/images/pants2.jpg'},
];

let currentProduct = null;


var topsButton = document.getElementById("topsButton");
var jacketsButton = document.getElementById("jacketsButton");
var skirtsButton = document.getElementById("skirtsButton");
var pantsButton = document.getElementById("pantsButton");
var dressesButton = document.getElementById("dressesButton");


topsButton.addEventListener("click", function () {
    filterClothes('tops');
});

jacketsButton.addEventListener("click", function () {
    filterClothes('jackets');
});

skirtsButton.addEventListener("click", function () {
    filterClothes('skirts');
});

pantsButton.addEventListener("click", function () {
    filterClothes('pants');
});

dressesButton.addEventListener("click", function () {
    filterClothes('dresses');
});

/**
 * který filtruje oblečení podle daného typu. Nastaví aktuální filtr rovný předanému typu, pak vymaže kontejner produktů na stránce a naplní jej filtrovanými produkty, které odpovídají zadanému typu.
 * @param type
 */
function filterClothes(type) {
    currentFilter = type;
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    const filteredProducts = productsData.filter(product => product.type === type);

    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });

    closeEnlargedImage();
}

/**
 * funkce, která vytvoří prvek produktu na základě předaného objektu produktu a vyplní jej obsahem HTML včetně obrázku produktu, názvu, ceny a tlačítka "Přidat do košíku". Všechny informace o produktu jsou předávány prostřednictvím datových atributů
 * @param product
 * @returns {HTMLDivElement}
 */
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}" data-product-name="${product.name}" data-product-image="${product.image}" data-product-price="${product.price}">
    <p>${product.name}</p>
<p>Price: $${product.price}</p>
<button class="addToCartButton" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">Add to Cart</button>

    `;
    return productElement;
}

document.getElementById('productsContainer').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        const productName = event.target.dataset.productName;
        const productImage = event.target.dataset.productImage;
        const productPrice = event.target.dataset.productPrice;
        toggleProduct(productName, productImage, productPrice);
    }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("addToCartButton")) {
        const productId = event.target.getAttribute("data-product-id");
        const productName = event.target.getAttribute("data-product-name");
        const productPrice = event.target.getAttribute("data-product-price");
        addToCart(productId, productName, productPrice);
    }
});

/**
 * funkce, která přepíná zobrazení zvětšeného obrázku produktu a jeho popisu. Pokud kontejner pro zvětšený obrázek ještě neexistuje, vytvoří se pomocí přenesených údajů o výrobku (název, obrázek, cena).
 * obsahuje obrázek, tlačítko zpět, popis produktu a komentář.
 * @param productName - název produktu
 * @param productImage - obrázek produktu
 * @param productPrice - cena produktu
 */
function toggleProduct(productName, productImage, productPrice) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    const productDescription = getProductDescription(productName);

    const enlargedImageContainer = document.querySelector('.enlarged-image-container');

    if (!enlargedImageContainer) {
        const newEnlargedImageContainer = document.createElement('div');
        newEnlargedImageContainer.className = 'enlarged-image-container';
        newEnlargedImageContainer.setAttribute('data-product', productName);
        newEnlargedImageContainer.innerHTML = `
    <div class="enlarged-image-overlay" data-action="toggleProductList"></div>
    <button data-action="toggleProductList" class="back-button"> ← </button>
    <img src="${productImage}" class="enlarged-image" alt="${productName}">
    <div class="product-description">${productDescription}</div>
    
    <div class="comments">
        <textarea id="commentInput" placeholder="add your comment"></textarea>
        <button data-action="addComment">add comment</button>
        <div id="commentsContainer"></div>
    </div>
`;

        newEnlargedImageContainer.addEventListener("click", function (event) {
            const action = event.target.getAttribute("data-action");
            if (action) {
                switch (action) {
                    case "toggleProductList":
                        toggleProductList();
                        break;
                    case "addComment":
                        addComment();
                        break;
                }
            }
        });

        productsContainer.appendChild(newEnlargedImageContainer);

        currentProduct = productName;

        loadComments(productName);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var angleIcon = document.querySelector(".angle");
    var targetElement = document.querySelector(".downnavbar");

    angleIcon.addEventListener("click", function () {
        targetElement.scrollIntoView({ behavior: "smooth" });
    });
});

/**
 * vrátí popis produktu na základě předaného názvu produktu
 * @param productName - název produktu
 * @returns {*|string} - popis produktu
 */
function getProductDescription(productName) {
    const descriptions = {
        'skirt 1': 'La couleur indigo profonde de la jupe en jean ajoute une touche polyvalente, permettant de l\'associer facilement à une variété de hauts et de chaussures. Les coutures contrastées et les poches fonctionnelles ajoutent une touche décontractée, tandis que la longueur midi offre une élégance subtile. Cette pièce peut être stylisée avec des baskets pour un look décontracté ou des talons pour une allure plus sophistiquée. Fabriquée avec des finitions soignées, cette jupe en jean incarne le mariage parfait entre le style intemporel et le confort moderne, en faisant d\'elle un incontournable de toute garde-robe.',
        'skirt 2': 'Cette jupe longue en satin incarne l\'élégance raffinée. Confectionnée dans un satin luxueux, elle offre une fluidité exquise au toucher. La coupe fluide souligne avec élégance les courbes féminines, créant une silhouette gracieuse. Idéale pour les occasions spéciales, cette pièce évoque le glamour subtil et la sophistication, faisant d\'elle un choix incontournable pour une soirée chic. Les nuances chatoyantes du satin ajoutent une touche somptueuse, faisant de cette jupe une déclaration de style qui ne passera pas inaperçue.',
        'skirt 3': 'Cette jupe courte en cuir émane une audace et une sensualité incontestables. Confectionnée dans un cuir haut de gamme, elle allie durabilité et résistance. La coupe moulante souligne avec flair les formes féminines, créant une allure captivante. Parfaite pour une soirée ou une sortie entre amis, cette pièce incarne le côté sexy et chic du cuir. Les détails impeccables et la texture luxueuse ajoutent une dimension supplémentaire, faisant de cette jupe un choix audacieux pour celles qui cherchent à affirmer leur style avec confiance et charme.',
        'skirt 4': 'Cette magnifique jupe longue en satin représente une élégance sophistiquée. Fabriquée à partir d\'un satin de luxe, elle offre une sensation exquise au toucher. La coupe fluide met en valeur avec finesse les formes féminines, créant une silhouette gracieuse. Parfaite pour des événements spéciaux, cette pièce évoque un charme subtil et une sophistication, en faisant d\'elle un choix incontournable pour une soirée élégante. Les nuances chatoyantes du satin ajoutent une touche somptueuse, transformant cette jupe en une déclaration de style qui ne passera pas inaperçue.',
        'dress 1': 'Bien sûr! Voici une description d\'une robe en français :\n' +
            '\n' +
            'Cette magnifique robe incarne l\'élégance intemporelle et la sophistication. Fabriquée avec un tissu délicat, elle épouse délicatement les courbes féminines, créant une silhouette gracieuse. Les détails exquis, tels que la dentelle délicate et les broderies artistiques, ajoutent une touche de romantisme. La robe présente une coupe élégante, mettant en valeur le décolleté et la taille. La jupe fluide et légère ajoute une allure féminine et aérienne à l\'ensemble. Parfaite pour les occasions spéciales, cette robe évoque le charme classique et la sophistication à la française. Un chef-d\'œuvre de la mode qui incarne le style et la grâce.',
        'dress 2': 'Cette robe longue en dentelle incarne une romance et une élégance intemporelles. Confectionnée dans une dentelle délicate et raffinée, elle évoque une féminité sophistiquée. La coupe fluide caresse gracieusement les courbes, créant une silhouette époustouflante. Idéale pour une occasion spéciale ou une soirée chic, cette pièce est un chef-d\'œuvre de grâce et de charme. Les détails subtils de la dentelle ajoutent une touche de mystère, faisant de cette robe un choix inoubliable pour celles qui recherchent une élégance romantique et intemporelle.',
        'dress 3': 'Cette robe midi en coton incarne le confort et la décontraction. Confectionnée dans un coton de haute qualité, elle offre une douceur et un confort exceptionnels. La coupe ample apporte une fluidité flatteuse pour toutes les silhouettes. Parfaite pour une journée à la plage ou une soirée entre amis, cette pièce se distingue par son style décontracté et polyvalent. Les détails soignés et le tissu agréable à porter font de cette robe le choix idéal pour celles qui recherchent une tenue décontractée sans compromis sur le style lors des occasions décontractées.',
        'dress 4': 'Cette robe courte en lin capture l\'esprit bohème avec une touche de chic. Confectionnée dans un lin de haute qualité, elle allie douceur et fluidité pour une sensation agréable. La coupe fluide met en valeur gracieusement les formes féminines, créant une allure séduisante. Idéale pour une journée ensoleillée ou une soirée élégante, cette pièce incarne le mariage parfait entre décontraction et sophistication. Les détails impeccables du lin ajoutent une note de raffinement, faisant de cette robe un choix incontournable pour celles qui recherchent un style bohème et élégant, que ce soit sous le soleil éclatant ou lors d\'une soirée sous les étoiles.',
        'dress 5': 'Cette robe longue en mousseline incarne la romance et l\'élégance aérienne, idéale pour une soirée chic ou un événement formel. Confectionnée dans une mousseline de haute qualité, elle offre une légèreté et une fluidité exquises. La coupe fluide met en valeur gracieusement les courbes féminines, créant une silhouette séduisante. La longueur généreuse ajoute une touche de sophistication, parfaite pour une soirée élégante ou un événement formel. Les détails délicats de la mousseline ajoutent une note subtile de féminité, faisant de cette robe un choix incontournable pour celles qui recherchent une tenue à la fois romantique et raffinée pour des occasions spéciales.',
        'dress 6': 'Cette robe midi en velours incarne l\'élégance et la sophistication, en faisant d\'elle un choix parfait pour une occasion spéciale. Confectionnée dans un velours de haute qualité, elle offre une sensation douce et un confort exceptionnel. La coupe ajustée met en valeur gracieusement la silhouette, créant une allure séduisante. La longueur midi ajoute une touche de raffinement, parfaite pour une soirée chic ou un événement formel. Les détails luxueux du velours, associés à une finition soignée, ajoutent une note de sophistication, faisant de cette robe une pièce incontournable pour celles qui recherchent une tenue à la fois élégante et confortable pour des occasions spéciales.',
        'top 1': 'Ce top en coton incarne le confort et la décontraction avec élégance. Confectionné dans un coton de haute qualité, il offre une douceur et un agrément exceptionnels. La coupe ample crée une silhouette flatteuse pour toutes les morphologies. Parfait pour une journée à la plage ou une soirée entre amis, ce top se distingue par son style décontracté et polyvalent. Les détails soignés et le tissu agréable à porter font de ce top le choix idéal pour celles qui recherchent une tenue décontractée sans sacrifier le style lors des moments décontractés, ajoutant une touche de confort raffiné à chaque occasion.',
        'top 2': 'Ce top en dentelle incarne une romance et une élégance intemporelles. Confectionné dans une dentelle délicate et raffinée, il évoque une féminité sophistiquée. La coupe ajustée met en valeur gracieusement la silhouette, créant une allure séduisante. Idéal pour une occasion spéciale ou une soirée chic, ce top est un chef-d\'œuvre de grâce et de charme. Les détails subtils de la dentelle ajoutent une touche de mystère, faisant de ce top un choix inoubliable pour celles qui recherchent une élégance romantique et intemporelle, parfait pour briller lors d\'événements spéciaux.',
        'top 3': 'Ce top en cuir incarne l\'audace et la sensualité avec une touche de chic. Confectionné dans un cuir de haute qualité, il allie durabilité et résistance. La coupe ajustée met en valeur gracieusement la silhouette, créant une allure captivante. Parfait pour une soirée ou une sortie entre amis, ce top est un choix audacieux qui marie à la perfection le côté sexy et sophistiqué du cuir. Les détails impeccables et la texture luxueuse ajoutent une dimension supplémentaire, faisant de ce top une déclaration de style inoubliable pour celles qui cherchent à affirmer leur allure avec confiance et charme.',
        'jacket 1': 'Cette veste en jean incarne l\'essence du classique intemporel. Confectionnée dans un denim de qualité supérieure, elle allie douceur et confort exceptionnels. La coupe droite flatteuse s\'adapte à toutes les silhouettes avec élégance. Que ce soit pour une journée décontractée ou une soirée élégante, cette pièce polyvalente s\'adapte à toutes les occasions. Les détails soignés, les coutures contrastées et la texture du denim ajoutent une touche décontractée tout en préservant une allure sophistiquée. Cette veste en jean demeure une pièce incontournable pour ceux qui recherchent un équilibre parfait entre style intemporel et confort moderne.',
        'jacket 2': 'Cette veste en cuir incarne l\'élégance et la sophistication avec une touche de modernité. Confectionnée dans un cuir de haute qualité, elle allie durabilité et résistance. La coupe ajustée met en valeur gracieusement la silhouette, créant une allure séduisante. Parfaite pour une occasion spéciale ou une soirée chic, cette pièce est un chef-d\'œuvre de style intemporel et contemporain. Les détails impeccables du cuir, associés à une finition soignée, ajoutent une touche de luxe, faisant de cette veste un choix incontournable pour celles qui cherchent à affirmer leur élégance avec confiance et raffinement lors des moments spéciaux.',
        'pants 1': '\n' +
            'Ce pantalon en jean représente l\'éternel classique. Confectionné dans un denim de qualité supérieure, il offre une douceur et un confort exceptionnels. La coupe droite flatteuse s\'adapte avec élégance à toutes les silhouettes, en faisant une pièce polyvalente idéale pour une journée décontractée ou une soirée élégante. Les détails soignés et la texture du denim ajoutent une touche de décontraction tout en maintenant une allure sophistiquée. Ce pantalon en jean demeure une option incontournable pour ceux qui recherchent le mariage parfait entre style intemporel et confort moderne.',
        'pants 2': '\n' +
            'Ce pantalon en cuir incarne l\'élégance et la sophistication avec une note de modernité. Confectionné dans un cuir de haute qualité, il allie durabilité et résistance. La coupe ajustée met en valeur gracieusement la silhouette, créant une allure séduisante. Parfait pour une occasion spéciale ou une soirée chic, ce pantalon est un symbole de style intemporel et contemporain. Les détails impeccables du cuir, associés à une finition soignée, ajoutent une touche luxueuse, faisant de ce pantalon un choix incontournable pour celles qui recherchent à affirmer leur élégance avec confiance et raffinement lors des moments spéciaux.',
    };

    return descriptions[productName] || '';
}

/**
 * přepne zobrazení seznamu produktů v závislosti na aktuálním filtru.
 */
function toggleProductList() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    const filteredProducts = productsData.filter(product => product.type === currentFilter);

    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });

    closeEnlargedImage();
}

/**
 * zavře zvětšený obrázek produktu
 */

function closeEnlargedImage() {
    const productsContainer = document.getElementById('productsContainer');
    const enlargedImageContainer = document.querySelector('.enlarged-image-container');
    if (enlargedImageContainer) {


        productsContainer.removeChild(enlargedImageContainer);
    }
}


filterClothes('skirts');

/**
 * funkce, která přidá produkt do nákupního košíku. Zjistí stav košíku, zkontroluje dostupnost, zvýší nebo přidá košík.
 * @param productId
 * @param productName
 * @param productPrice
 */
function addToCart(productId, productName, productPrice) {
    let cart = getCart();

    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({productId, productName, productPrice, quantity: 1});
    }

    saveCart(cart);
    updateCartUI();
    showNotification(`${productName} added to cart!`);
}

/**
 * přidá komentář k produktu. pak se zavolá funkce saveComment, která uloží komentář na server.
 */

function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        const commentsContainer = document.getElementById('commentsContainer');

        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<p>${commentText}</p>`;
        commentsContainer.appendChild(commentElement);

        saveComment(commentText, currentProduct);

        commentInput.value = '';
    }
}

function saveComment(commentText, productName) {
    const formData = new FormData();
    formData.append('comment', commentText);
    formData.append('product', productName);

    fetch('../html/save_comment.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 'success') {
                loadComments(productName);
            }
        })
        .catch(error => console.error('Error:', error));
}

/**
 * funkce, která načte komentáře k aktuálnímu produktu. K odeslání požadavku na server používá funkci fetch. Po obdržení odpovědi ze serveru ve formátu JSON funkce vymaže zásobník commentsContainer a přidá nové komentáře.
 */
function loadComments() {
    const commentsContainer = document.getElementById('commentsContainer');

    fetch('../html/load_comments.php?product=' + currentProduct)
        .then(response => response.json())
        .then(productComments => {
            commentsContainer.innerHTML = '';

            if (Array.isArray(productComments) && productComments.length > 0) {
                productComments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `<p>${comment}</p>`;
                    commentsContainer.appendChild(commentElement);
                });
            } else {
                commentsContainer.innerHTML = '<p>add your comment</p>';
            }
        })
        .catch(error => console.error('Error:', error));
}

const itemsPerPage = 3;
let currentPage = 1;

function updatePageNumbers() {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = '';

    const totalItems = productsData.filter(product => product.type === currentFilter).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.textContent = i;
        pageNumberButton.addEventListener('click', function () {
            currentPage = i;
            showProductsOnCurrentPage();
        });

        pageNumbersContainer.appendChild(pageNumberButton);
    }
    for (let i = 1; i <= totalPages; i++) {
        pageNumberButton.textContent = i;
        pageNumberButton.href = `items.php?page=${i}&filter=${currentFilter}`;
        pageNumbersContainer.appendChild(pageNumberButton);
    }
}

function showProductsOnCurrentPage() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    const filteredProducts = productsData.filter(product => product.type === currentFilter);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    currentProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        showProductsOnCurrentPage();
    }
});

document.getElementById('nextPage').addEventListener('click', function () {
    const totalItems = productsData.filter(product => product.type === currentFilter).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        showProductsOnCurrentPage();
    }
});

updatePageNumbers();
showProductsOnCurrentPage();
