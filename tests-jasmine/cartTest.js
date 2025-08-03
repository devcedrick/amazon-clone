import { addToCart, cart, getCartQuantity, loadFromLocalStorage } from "../data/cart.js";
import { products } from "../data/products.js";

describe('Test Suite: Add To Cart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliverOptionId: '1'
            }]);
        });
        loadFromLocalStorage();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(getCartQuantity()).toBe(2);
        //expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    });

    it('adds new product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromLocalStorage();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart.length).toBe(1);
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(getCartQuantity()).toBe(1);
        //expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});