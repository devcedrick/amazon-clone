//NEW LINES
import { getCartQuantity, findCartItems, saveToLocalStorage } from "../../data/cart.js";
import { handleEventListeners, renderOrderSummary } from "./checkout/orderSummary.js";
import { updateOrderSummary } from "./checkout/paymentSummary.js";


document.querySelector('.return-to-home-link').textContent = `${getCartQuantity()} items`;


renderOrderSummary();
updateOrderSummary();

//=========================
// initialize the page



// other helper functions

