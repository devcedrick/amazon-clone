import { getDeliveryPrice } from "../../data/deliveryOptions.js";
import { findProduct } from "../../data/products.js";

export function formatCurrency(num) {
    return (Math.round(num) / 100).toFixed(2);
}

export function getProductsCost(cart) {
    return cart.reduce((sum, item) => {
        let product = findProduct(item.productId);
        return sum + (product.priceCents * item.quantity);
    }, 0);
}


export function getTotalCost(totalSF, productsCostCents, taxCents){
    return totalSF + productsCostCents + taxCents;
}

let isAllowedtoPlaceOrder = true;

export function getTotalShippingFee(cart){
    return cart.reduce((sum, item) => {
        return sum + getDeliveryPrice(item.deliveryOptionId);
    }, 0);
}