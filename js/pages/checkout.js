import { products } from "../../data/products.js";
import { cart, cartQuantity } from "../../data/cart.js";
import { formatCurrency, getTotalCost, calcTotalShippingFee} from "../utils/money.js";

document.querySelector('.return-to-home-link').textContent = `${cartQuantity} items`;

let cartHTML = '';

let productMap = new Map();
products.forEach(product => {
    productMap.set(product.id, product);
});

function findProduct(key){ return productMap.get(key); }

let productsCostCents = 0;
// Generates all cart items
cart.forEach(cartItem => {
    const product = findProduct(cartItem.productId);
    cartHTML += `
        <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                  <input type="radio" checked
                    class="delivery-option-input js-delivery-option"
                    name="delivery-option-${product.id}" data-price-cents="free">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-delivery-option"
                    name="delivery-option-${product.id}" data-price-cents="499">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-delivery-option"
                    name="delivery-option-${product.id}" data-price-cents="999">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
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
    productsCostCents += (product.priceCents * cartItem.quantity);
});
console.log(productsCostCents);
document.querySelector('.order-summary').innerHTML = cartHTML;

// Updates the order summary
let totalShippingFee = calcTotalShippingFee(cart);
//productsCostCent
let subTotal = productsCostCents + totalShippingFee;
let tax = subTotal * 0.10;


document.querySelector('.payment-summary-row').textContent = `Items (${cartQuantity})`;
document.querySelector('.product-cost').textContent = `$${formatCurrency(subTotal)}`;

document.querySelector('.total-sf').textContent = `$${formatCurrency(totalShippingFee)}`;
document.querySelector('.tax-fee').textContent = `$${formatCurrency(tax)}`;
document.querySelector('.order-total').textContent = `$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}`;

document.querySelectorAll('.js-delivery-option').forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        totalShippingFee = calcTotalShippingFee(cart);
        subTotal = productsCostCents + totalShippingFee;
        tax = subTotal * 0.10 ;

        document.querySelector('.total-sf').textContent = `$${formatCurrency(totalShippingFee)}`;
        document.querySelector('.order-total').textContent = `$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}`;
        document.querySelector('.product-cost').textContent = `$${((productsCostCents + totalShippingFee) / 100).toFixed(2)}`;
        console.log(totalShippingFee / 100);
        document.querySelector('.tax-fee').textContent = `$${formatCurrency(tax)}`;
    });
});

