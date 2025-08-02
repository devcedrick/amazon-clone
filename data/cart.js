export const cart = getCartItemsFromStorage();
export const cartItemsMap = updateCartItemsMap();

export function getCartQuantity() { return cart.reduce((sum, item) => sum + item.quantity, 0);}

function getCartItemsFromStorage() {
    try{
        const cartData = localStorage.getItem('cart');
        if(!cartData) return [];
        return JSON.parse(cartData);
    }
    catch (e) {
        console.log('Invalid JSON or localStorage', e);
        return [];
    }
}

function initCartQuantity(){
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
}

export function addToCart(product) {
    let matchedItem;
    cart.forEach(item => {
        if(item.productId === product.productId)
            matchedItem = item;
        return;
    });

    if(matchedItem) {
        matchedItem.quantity++;
    } else {
        cart.push(product);
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