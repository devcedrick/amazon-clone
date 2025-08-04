//NEW LINES
import { getCartQuantity } from "../../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";


document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;


renderOrderSummary();
renderPaymentSummary();

//=========================
// initialize the page



// other helper functions

