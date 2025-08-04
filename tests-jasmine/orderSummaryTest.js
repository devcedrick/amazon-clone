import { renderOrderSummary } from "../js/pages/checkout/orderSummary.js";
import { loadFromLocalStorage, cart } from "../data/cart.js";

describe("Test Suite: renderOrderSummary", () => {
    const productId = [
        "dd82ca78-a18b-4e2a-9250-31e67412f98d",
        "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        "3fdfe8d6-9a15-4979-b459-585b0d0545b9"
    ];

    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d", quantity: 1, 
                deliveryOptionId: "2"
            }, {
                productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53", 
                quantity: 2, 
                deliveryOptionId: "1"
            }, {
                productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9", 
                quantity: 3, 
                deliveryOptionId: "3"
            }]);
        });
        spyOn(localStorage, 'setItem');
        loadFromLocalStorage();

        document.querySelector('.js-test-container').innerHTML = `
        <span class="return-to-home-link"></span>
        <div class="order-summary"></div>
        <div class="payment-summary"></div>
        `;

        renderOrderSummary();
    });
    
    afterAll(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })

    it('should displays the cart', () => {
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toBe(3);

        expect(
            document.querySelector(`.product-quantity-${productId[0]}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.product-quantity-${productId[1]}`).innerText
        ).toContain('Quantity: 2');
        
        expect(
            document.querySelector(`.product-quantity-${productId[2]}`).innerText
        ).toContain('Quantity: 3');

    });

    it('should remove a product', () => {
        const deleteButton = document.querySelector(`.delete-quantity-link[id="${productId[0]}"]`);

        expect(deleteButton).not.toBeNull();

        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        deleteButton.dispatchEvent(clickEvent);

        expect( 
            document.querySelectorAll('.cart-item-container').length
        ).toBe(2);

        cart.forEach((item, index) => {
            console.log(`CART ${index}: ${item.productId}`);
        })

        expect(
            document.querySelector(`.js-cart-item-container-${productId[0]}`)
        ).toBeNull();
        expect(
            document.querySelector(`.js-cart-item-container-${productId[1]}`)
        ).not.toBeNull();
        expect(
            document.querySelector(`.js-cart-item-container-${productId[2]}`)
        ).not.toBeNull();

        
    });
 
});