import { loadCart, getCartQuantity } from "../../data/cart.js";
import { orders } from "../../data/orders.js";
import { fetchProducts, findProduct } from "../../data/products.js";
import { formatOrderDate } from "../utils/date.js";

renderOrderGrid();

async function renderOrderGrid() {
    await fetchProducts();
    await new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    });
    document.querySelector('.cart-quantity').textContent = `${getCartQuantity()}`;
    let ordersHTML = '';
    orders.forEach(order => {
        ordersHTML += `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>August 06</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$35.06</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>c6a2e790-b2bd-42ab-8c1f-1da84031af00</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${renderProductsPerOrder(order.products)}
                </div>
            </div>
        `;
        console.log();
    })
    document.querySelector('.orders-grid').innerHTML = ordersHTML;
}

function renderProductsPerOrder(products) {
    let productsHTML = ``;
    console.log(`No. of Products Ordered: ${products.length}`);
    products.forEach((product, index) => {
        const productDetails = findProduct(product.productId);
        console.log(`Product ${index + 1}: ${productDetails.name}`);

        productsHTML += `
            <div class="product-image-container">
                <img src="${productDetails.getImagePath()}">
            </div>

            <div class="product-details">
            <div class="product-name">
                ${productDetails.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${formatOrderDate(product.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
                Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
            </div>

            <div class="product-actions">
            <a href="tracking.html">
                <button class="track-package-button button-secondary">
                Track package
                </button>
            </a>
            </div>
        `;
    });
    return productsHTML;
}