//NEW LINES
import { getCartQuantity } from "../../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../../data/backend-practice.js';
import { loadProducts } from "../../data/products.js";


loadProducts(() => {
    document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;

    renderOrderSummary();
    renderPaymentSummary();
});

//=========================
// initialize the page



// other helper functions

