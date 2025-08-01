export const cart = [];

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