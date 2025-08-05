export let cart;
loadFromLocalStorage();

export const cartItemsMap = updateCartItemsMap();

export function getCartQuantity() { return cart.reduce((sum, item) => sum + item.quantity, 0);}

export function loadFromStorage(){

}

export function loadFromLocalStorage() {
    try{
        cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart) {
            cart = [];
            return;
        };
    }
    catch (e) {
        console.log('Invalid JSON or localStorage', e);
        cart = [];
    }
}

export function addToCart(id) {
    let matchedItem;
    cart.forEach(item => {
        if(item.productId === id)
            matchedItem = item;
        return;
    });

    if(matchedItem) {
        matchedItem.quantity++;
    } else {
        cart.push({
            productId: id,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
}

function updateCartItemsMap() {
    const map = new Map();
    cart.forEach(item => {
        map.set(item.productId, item);
    });
    return map;
}

export function findCartItems(id) { return cartItemsMap.get(id); }

export function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeItem(removeId) {
    cart = cart.filter(item => item.productId !== removeId)
    saveToLocalStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);

    if(typeof fun === 'function')
      fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}