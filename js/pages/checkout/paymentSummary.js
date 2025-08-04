import { getProductsCost, getTotalShippingFee, getTotalCost, formatCurrency } from "../../utils/money.js";
import { cart, getCartQuantity } from "../../../data/cart.js"

/*
export function updatePaymentSummary () {
}
*/

export function renderPaymentSummary() {
    let productsCostCents = getProductsCost(cart);
    let totalShippingFee = getTotalShippingFee(cart);
    let subTotal = productsCostCents + totalShippingFee;
    let tax = subTotal * 0.10;
    
    document.querySelector('.payment-summary').innerHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div class="payment-items">Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money product-cost">$${formatCurrency(productsCostCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money total-sf">$${formatCurrency(totalShippingFee)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money subtotal-cost">$${formatCurrency(subTotal)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money tax-fee">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money order-total">$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
}
