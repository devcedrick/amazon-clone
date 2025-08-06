import { getCartQuantity } from "../../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../../data/backend-practice.js';
import { fetchProducts } from "../../data/products.js";
import { loadCart } from "../../data/cart.js";

async function renderCheckoutPage() {
    await fetchProducts();
    await new Promise(resolve => {
         loadCart(() => {
             resolve();
         });
    });

    document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;
    renderOrderSummary();
    renderPaymentSummary();
}

renderCheckoutPage();

