export const deliveryOptions = [{
    id: '1',
    deliveryTime: 7,
    deliveryPriceCents: 0
}, {
    id: '2',
    deliveryTime: 3,
    deliveryPriceCents: 499
}, {
    id: '3',
    deliveryTime: 1,
    deliveryPriceCents: 999
}];

export function getDeliveryPrice(id) {
    const opt = deliveryOptions.find(option => option.id === id);
    return opt.deliveryPriceCents;
}

export function getSelectedDeliveryOption(id) {
    return deliveryOptions.find(option => option.id === id);
}