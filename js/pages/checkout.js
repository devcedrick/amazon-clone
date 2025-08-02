import { findProduct } from "../../data/products.js";
import { cart, getCartQuantity, findCartItems} from "../../data/cart.js";
import { formatCurrency, getTotalCost, calcTotalShippingFee} from "../utils/money.js";
import { setDeliveryDate, getFreeShippingDate, getStandardShippingDate, getExpressShippingDate } from "../utils/date.js";

// initialize the page
let productsCostCents = 0;
let totalShippingFee;
let subTotal = productsCostCents + totalShippingFee;
let tax = subTotal * 0.10;

generateCartItemsHTML();
updateOrderSummary();
attachCartEventListeners();

// Generates all cart items
function generateCartItemsHTML() {
    let productCost = 0;
    document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;
    let cartHTML = '';
    cart.forEach(cartItem => {
        const product = findProduct(cartItem.productId);
        cartHTML += `
            <div class="cart-item-container">
                <div class="delivery-date" id="${product.id}">
                Delivery date: 
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${product.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input js-delivery-option"
                        name="delivery-option-${product.id}" value="free" data-product-id="${product.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${getFreeShippingDate()}
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input js-delivery-option"
                        name="delivery-option-${product.id}" value="499" data-product-id="${product.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${getStandardShippingDate()}
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input js-delivery-option"
                        name="delivery-option-${product.id}" value="999" data-product-id="${product.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${getExpressShippingDate()}
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
        productCost += (product.priceCents * cartItem.quantity);
    });
    productsCostCents = productCost;
    document.querySelector('.order-summary').innerHTML = cartHTML;

    //updateCartItemsMap();

    cart.forEach(cartItem => {
        setRadioButton(cartItem);
    })
}

// Updates the order summary
function updateOrderSummary(){
    totalShippingFee = calcTotalShippingFee(cart);
    //productsCostCent
    subTotal = productsCostCents + totalShippingFee;
    tax = subTotal * 0.10;


    document.querySelector('.payment-summary-row').textContent = `Items (${getCartQuantity()})`;
    document.querySelector('.product-cost').textContent = `$${formatCurrency(subTotal)}`;

    document.querySelector('.total-sf').textContent = `$${formatCurrency(totalShippingFee)}`;
    document.querySelector('.tax-fee').textContent = `$${formatCurrency(tax)}`;
    document.querySelector('.order-total').textContent = `$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}`;
}

function attachCartEventListeners() {
    // Iterate over all RADIO BUTTONS for EACH CART ITEM
    document.querySelectorAll('.js-delivery-option').forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            const item = findCartItems(radioButton.dataset.productId);
            if(item)
                item.shippingOption = radioButton.value;

            setDeliveryDate(radioButton.value, document.getElementById(item.productId));

            totalShippingFee = calcTotalShippingFee(cart);
            subTotal = productsCostCents + totalShippingFee;
            tax = subTotal * 0.10 ;

            document.querySelector('.total-sf').textContent = `$${formatCurrency(totalShippingFee)}`;
            document.querySelector('.order-total').textContent = `$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}`;
            document.querySelector('.product-cost').textContent = `$${((productsCostCents + totalShippingFee) / 100).toFixed(2)}`;
            document.querySelector('.tax-fee').textContent = `$${formatCurrency(tax)}`;

            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Handle cart item deletion
    document.querySelectorAll('.delete-quantity-link').forEach((button, index) => {
        button.addEventListener('click', () => {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            document. querySelector('.order-summary').innerHTML = '';
            generateCartItemsHTML();
            updateOrderSummary();
            attachCartEventListeners();
        });
    });
}

// other helper functions

function setRadioButton(item) {
    const savedOption = item.shippingOption;
    const radioButton = document.querySelector(`input[name="delivery-option-${item.productId}"][value="${savedOption}"]`);

    if(radioButton) {
        radioButton.checked = true;
        item.shippingOption = savedOption;
    } else {
        document.querySelector(`input[name="delivery-option-${item.productId}"][value="free"]`).checked = true;
        item.shippingOption = 'free';
    }
    
    const deliveryDate = document.getElementById(item.productId);
    setDeliveryDate(radioButton.value, deliveryDate);
}
 







