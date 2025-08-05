//NEW LINES
import { getCartQuantity } from "../../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../../data/backend-practice.js';
import { fetchProducts } from "../../data/products.js";
import { loadCart } from "../../data/cart.js";

Promise.all([
    fetchProducts(),
    new Promise(resolve => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;

    renderOrderSummary();
    renderPaymentSummary();
});

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
    
// });


//=========================
// initialize the page



// other helper functions

