import { getProductsCost, getTotalShippingFee, getTotalCost, formatCurrency } from "../../utils/money.js";
import { cart, getCartQuantity } from "../../../data/cart.js"

export function updateOrderSummary () {
    let productsCostCents = getProductsCost(cart);
    let totalShippingFee = getTotalShippingFee(cart);
    let subTotal = productsCostCents + totalShippingFee;
    let tax = subTotal * 0.10;

    document.querySelector('.payment-items').textContent = `Items (${getCartQuantity()})`;
    document.querySelector('.product-cost').textContent = `$${formatCurrency(productsCostCents)}`;

    document.querySelector('.subtotal-cost').textContent = `$${formatCurrency(subTotal)}`;

    document.querySelector('.total-sf').textContent = `$${formatCurrency(totalShippingFee)}`;
    document.querySelector('.tax-fee').textContent = `$${formatCurrency(tax)}`;
    document.querySelector('.order-total').textContent = `$${formatCurrency(getTotalCost(totalShippingFee, productsCostCents, tax))}`;
}

