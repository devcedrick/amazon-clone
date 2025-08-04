import { findProduct } from "../../../data/products.js";
import { cart, getCartQuantity, findCartItems, saveToLocalStorage, removeItem} from "../../../data/cart.js";
import { formatCurrency} from "../../utils/money.js";
import { getFreeShippingDate, getStandardShippingDate, getExpressShippingDate, getShippingDate } from "../../utils/date.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getDeliveryPrice, getSelectedDeliveryOption } from "../../../data/deliveryOptions.js";

export function renderOrderSummary(){
    let cartHTML = '';
    cart.forEach(cartItem => {
        const product = findProduct(cartItem.productId);
        cartHTML += `
            <div class="cart-item-container js-cart-item-container-${product.id}">
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
                    <div class="product-quantity product-quantity-${product.id}">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary" id=${product.id}>
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
                        name="delivery-option-${product.id}" value="free" data-product-id="${product.id}" data-option-id="1">
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
                        name="delivery-option-${product.id}" value="499" data-product-id="${product.id}" data-option-id="2">
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
                        name="delivery-option-${product.id}" value="999" data-product-id="${product.id}" data-option-id="3">
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
    });

    document.querySelector('.order-summary').innerHTML = cartHTML;

    cart.forEach(cartItem => {
        setRadioButton(cartItem);
        setDeliveryDate(cartItem);
    });

    handleEventListeners();
}

export function handleEventListeners() {
    // FOR DELIVERY OPTIONS
    document.querySelectorAll('.js-delivery-option').forEach(option => {
        option.addEventListener('change', () => {
            const item = findCartItems(option.dataset.productId);
            item.deliveryOptionId = option.dataset.optionId;
            saveToLocalStorage();
            document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;

            setDeliveryDate(item);
            renderPaymentSummary();
        });
    })

    // FOR DELETE LINKS
    document.querySelectorAll('.delete-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            // remove element in that specific part
            removeItem(link.id);
            renderOrderSummary();
            renderPaymentSummary();
            document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;
        });
    });
}



// helper functions
function setRadioButton(item) {
    const savedOption = String(getDeliveryPrice(item.deliveryOptionId));
    const radioButton = document.querySelector(`input[name="delivery-option-${item.productId}"][value="${savedOption}"]`);

    if(radioButton) {
        radioButton.checked = true;
    } else {
        document.querySelector(`input[name="delivery-option-${item.productId}"][value="free"]`).checked = true;
    }
}

function setDeliveryDate(item) {
    const deliveryOpt = getSelectedDeliveryOption(item.deliveryOptionId);
    document.getElementById(item.productId).textContent = getShippingDate(deliveryOpt.id);
}