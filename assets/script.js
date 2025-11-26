// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Traje Espacial X1",
        price: 12500,
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Traje espacial de última generación con sistema de soporte vital integrado. Perfecto para paseos espaciales y exploración planetaria. Incluye protección contra radiación y sistema de comunicaciones avanzado.",
        category: "Equipamiento"
    },
    {
        id: 2,
        name: "Nave Exploradora Orion",
        price: 250000,
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Nave de exploración interplanetaria con capacidad para 4 tripulantes. Incluye sistema de propulsión iónica, cabina presurizada, laboratorio de investigación y sistema de navegación estelar.",
        category: "Naves"
    },
    {
        id: 3,
        name: "Comunicador Cuántico",
        price: 7500,
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Sistema de comunicación instantánea basado en entrelazamiento cuántico. Funciona a cualquier distancia sin retraso. Ideal para misiones de larga duración y exploración profunda.",
        category: "Comunicaciones"
    },
    {
        id: 4,
        name: "Generador de Gravedad",
        price: 18000,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Dispositivo que simula gravedad terrestre en entornos de microgravedad. Mejora la salud ósea y muscular en misiones prolongadas. Ajustable desde 0.1G hasta 1.5G.",
        category: "Sistemas de Vida"
    },
    {
        id: 5,
        name: "Rover Lunar Atlas",
        price: 32000,
        image: "https://images.unsplash.com/photo-1614729939125-89e0f6dcd102?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Vehículo de exploración lunar con autonomía de 500km. Incluye sistema de muestreo y análisis de suelo, cámara de alta resolución y brazo robótico manipulador.",
        category: "Vehículos"
    },
    {
        id: 6,
        name: "Kit de Supervivencia Marciana",
        price: 8900,
        image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        description: "Kit completo para supervivencia en Marte. Incluye purificador de agua, generador de oxígeno, refugio inflable, botiquín médico y provisiones para 30 días.",
        category: "Supervivencia"
    }
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const contactForm = document.getElementById('contact-form');

/**
 * Inicializa la aplicación
 */
function initApp() {
    renderProducts();
    updateCart();
    setupNavigation();
    setupEventListeners();
    showPage('home-page');
}

/**
 * Renderiza los productos en la página de inicio
 */
function renderProducts() {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-4 mb-4';
        productCard.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2">${product.category}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description.substring(0, 100)}...</p>
                    <div class="mt-auto">
                        <p class="h4 text-primary">$${product.price.toLocaleString()}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                                <i class="bi bi-cart-plus"></i> Agregar al Carrito
                            </button>
                            <button class="btn btn-outline-secondary view-detail" data-id="${product.id}">
                                <i class="bi bi-eye"></i> Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones de productos
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            showProductDetail(productId);
        });
    });
}

/**
 * Muestra el detalle de un producto
 * @param {number} productId - ID del producto a mostrar
 */
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const productDetail = document.getElementById('product-detail');
    if (!productDetail) return;
    
    productDetail.innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" class="img-fluid detail-image" alt="${product.name}">
        </div>
        <div class="col-md-6">
            <span class="badge bg-secondary mb-2">${product.category}</span>
            <h2>${product.name}</h2>
            <p class="h3 text-primary mb-3">$${product.price.toLocaleString()}</p>
            <p class="mb-4">${product.description}</p>
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary btn-lg add-to-cart-detail" data-id="${product.id}">
                    <i class="bi bi-cart-plus"></i> Agregar al Carrito
                </button>
                <button class="btn btn-outline-secondary btn-lg" onclick="showPage('home-page')">
                    <i class="bi bi-arrow-left"></i> Volver a Productos
                </button>
            </div>
        </div>
    `;
    
    // Event listener para el botón de agregar al carrito en la página de detalle
    document.querySelector('.add-to-cart-detail').addEventListener('click', function() {
        addToCart(productId);
    });
    
    showPage('product-detail-page');
}

/**
 * Agrega un producto al carrito
 * @param {number} productId - ID del producto a agregar
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} agregado al carrito!`, 'success');
}

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto a eliminar
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Producto eliminado del carrito', 'warning');
}

/**
 * Actualiza el carrito y la interfaz
 */
function updateCart() {
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Actualizar página del carrito si está visible
    if (document.getElementById('cart-page')?.classList.contains('active')) {
        renderCart();
    }
}

/**
 * Renderiza el contenido del carrito
 */
function renderCart() {
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="alert alert-info text-center">
                <h4><i class="bi bi-cart-x"></i> Tu carrito está vacío</h4>
                <p>Explora nuestros productos y agrega algunos artículos.</p>
                <button class="btn btn-primary" onclick="showPage('home-page')">
                    <i class="bi bi-rocket"></i> Ver Productos
                </button>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = 'Total: $0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'card mb-3';
        cartItem.innerHTML = `
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2 col-4">
                        <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                    </div>
                    <div class="col-md-4 col-8">
                        <h5 class="h6">${item.name}</h5>
                        <p class="text-muted mb-0">$${item.price.toLocaleString()}</p>
                    </div>
                    <div class="col-md-2 col-6 mt-2 mt-md-0">
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary decrease-quantity" type="button" data-id="${item.id}">-</button>
                            <input type="number" class="form-control text-center quantity-input" 
                                   value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="btn btn-outline-secondary increase-quantity" type="button" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="col-md-2 col-4 mt-2 mt-md-0">
                        <p class="h6 mb-0">$${itemTotal.toLocaleString()}</p>
                    </div>
                    <div class="col-md-2 col-2 mt-2 mt-md-0 text-end">
                        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}" title="Eliminar producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar total
    if (cartTotal) {
        cartTotal.textContent = `Total: $${total.toLocaleString()}`;
    }
    
    // Agregar event listeners para los controles del carrito
    setupCartEventListeners();
}

/**
 * Configura los event listeners del carrito
 */
function setupCartEventListeners() {
    // Input de cantidad
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity < 1) {
                removeFromCart(productId);
            } else {
                const item = cart.find(item => item.id === productId);
                if (item) {
                    item.quantity = newQuantity;
                    updateCart();
                }
            }
        });
    });
    
    // Botones de incremento/decremento
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                } else {
                    removeFromCart(productId);
                }
            }
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

/**
 * Muestra una página específica y oculta las demás
 * @param {string} pageId - ID de la página a mostrar
 */
function showPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar la página seleccionada
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Actualizar navbar activo
    updateNavActive(pageId);
    
    // Scroll al inicio de la página
    window.scrollTo(0, 0);
}

/**
 * Actualiza la navegación activa
 * @param {string} pageId - ID de la página activa
 */
function updateNavActive(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    const activeLink = document.querySelector(`a[href="#${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }
}

/**
 * Configura la navegación
 */
function setupNavigation() {
    // Navegación por enlaces
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            showPage(targetPage);
        });
    });
    
    // Navegación por botones del logo
    document.querySelector('.navbar-brand').addEventListener('click', function(e) {
        e.preventDefault();
        showPage('home-page');
    });
}

/**
 * Configura los event listeners globales
 */
function setupEventListeners() {
    // Botón de finalizar compra
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Tu carrito está vacío', 'warning');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`¡Gracias por tu compra! Total: $${total.toLocaleString()}`, 'success');
            cart = [];
            updateCart();
            showPage('home-page');
        });
    }
    
    // Formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
            this.reset();
        });
    }
    
    // Prevenir envío de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
}

/**
 * Muestra una notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, warning, error)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al documento
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);

// Hacer funciones disponibles globalmente para onclick
window.showPage = showPage;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;