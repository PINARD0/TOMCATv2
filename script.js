// Datos de los productos
const products = [
    { id: 1, name: "Hamburguesa", price: 2, image: "images/big-mac.jpg" },
    { id: 2, name: "Chanclas", price: 3, image: "images/flip-flops.jpg" },
    { id: 3, name: "Pack de Coca Cola", price: 6, image: "images/coca-cola-pack.jpg" },
    { id: 4, name: "Ticket de cine", price: 8, image: "images/movie-ticket.jpg" },
    { id: 5, name: "Libro", price: 15, image: "images/book.jpg" },
    { id: 6, name: "Cena", price: 30, image: "images/lobster-dinner.jpg" },
    { id: 7, name: "Videojuego", price: 50, image: "images/video-game.jpg" },
    { id: 8, name: "Altavoz", price: 80, image: "images/amazon-echo.jpg"
    { id: 9, name: "Air Jordans", price: 125, image: "images/air-jordans.jpg" },
    { id: 10, name: "Airpods", price: 199, image: "images/airpods.jpg" },
    { id: 11, name: "Dron", price: 350, image: "images/drone.jpg" },
    { id: 12, name: "iPhone", price: 699, image: "images/smartphone.jpg" },
    { id: 13, name: "Gato", price: 1400, image: "images/kitten.jpg" },
    { id: 14, name: "Caballo", price: 3000, image: "images/horse.jpg" },
    { id: 15, name: "Bolso de diseñador", price: 5400, image: "images/designer-handbag.jpg" },
    { id: 16, name: "Jacuzzi", price: 7000, image: "images/hot-tub.jpg" },
    { id: 17, name: "Vino de lujo", price: 8500, image: "images/luxury-wine.jpg" },
    { id: 18, name: "Jet Ski", price: 14000, image: "images/jet-ski.jpg" },
    { id: 19, name: "Rolex", price: 30000, image: "images/rolex.jpg" },
    { id: 20, name: "Ford F-150", price: 50000, image: "images/ford-f-150.jpg" },
    { id: 21, name: "Casa de familia", price: 220000, image: "images/single-family-home.jpg" },
    { id: 22, name: "Barra de oro", price: 600000, image: "images/gold-bar.jpg" },
    { id: 23, name: "Franquicia de McDonalds", price: 2000000, image: "images/mcdonalds-franchise.jpg" },
    { id: 24, name: "Yate", price: 7500000, image: "images/yacht.jpg" },
    { id: 25, name: "Coche de Formula 1", price: 15000000, image: "images/formula-1-car.jpg" },
    { id: 26, name: "Mansion", price: 40000000, image: "images/mansion.jpg" },
    { id: 27, name: "Boeing 747", price: 138000000, image: "images/boeing-747.jpg" },
    { id: 28, name: "Mona Lisa", price: 800000000, image: "images/mona-lisa.jpg" },
    { id: 29, name: "Rascacielos", price: 1200000000, image: "images/skyscraper.jpg" },
    { id: 30, name: "Crucero", price: 1750000000, image: "images/cruise-ship.jpg" },
];

let balance = 100000000000; // Saldo inicial
let cart = {}; // Carrito de compras

// Función para actualizar el saldo mostrado
function updateBalance() {

    document.getElementById('balance-amount').textContent = balance.toLocaleString();
}

// Función para crear elementos de producto
function createProductElement(product) {

    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>€${product.price.toLocaleString()}</p>
        <div class="button-group">
            <button class="buy" onclick="buyProduct(${product.id})">Comprar</button>
            <button class="sell" onclick="sellProduct(${product.id})">Vender</button>
        </div>
        <p>Cantidad: <span id="quantity-${product.id}">0</span></p>
    `;
    return productDiv;
}

// Función para comprar un producto
function buyProduct(id) {

    const product = products.find(p => p.id === id);
    if (balance >= product.price) {
        balance -= product.price;
        cart[id] = (cart[id] || 0) + 1;
        updateBalance();
        updateProductQuantity(id);
        updateInvoice();
    } else {
        alert("Saldo insuficiente para comprar este producto.");
    }
}

// Función para vender un producto
function sellProduct(id) {

    if (cart[id] && cart[id] > 0) {
        const product = products.find(p => p.id === id);
        balance += product.price;
        cart[id]--;
        updateBalance();
        updateProductQuantity(id);
        updateInvoice();
    }
}

// Función para actualizar la cantidad de un producto
function updateProductQuantity(id) {

    document.getElementById(`quantity-${id}`).textContent = cart[id] || 0;
}

// Función para actualizar la factura
function updateInvoice() {

    const invoiceBody = document.getElementById('invoice-body');
    invoiceBody.innerHTML = '';
    let totalSpent = 0;

    for (const [id, quantity] of Object.entries(cart)) {
        if (quantity > 0) {
            const product = products.find(p => p.id === parseInt(id));
            const total = product.price * quantity;
            totalSpent += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${quantity}</td>
                <td>€${total.toLocaleString()}</td>
            `;
            invoiceBody.appendChild(row);
        }
    }

    document.getElementById('total-spent').textContent = `€${totalSpent.toLocaleString()}`;
}

// Inicialización
function init() {

    const productGrid = document.getElementById('products');
    products.forEach(product => {
        productGrid.appendChild(createProductElement(product));
    });
    updateBalance();
}

// Llamar a la función de inicialización cuando se cargue la página
window.onload = init;