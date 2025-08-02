import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const now = dayjs();

export function getFreeShippingDate() {
    return now.add(7, 'day').format('dddd, MMMM DD');
}

export function getStandardShippingDate() {
    return now.add(3, 'day').format('dddd, MMMM DD');
}

export function getExpressShippingDate() {
    return now.add(1, 'day').format('dddd, MMMM DD');
}

export function setDeliveryDate(rbValue, deliveryDate) {
    if(rbValue === 'free')
        deliveryDate.textContent = getFreeShippingDate();
    else if(rbValue === '499')
        deliveryDate.textContent = getStandardShippingDate();
    else if(rbValue === '999')
        deliveryDate.textContent = getExpressShippingDate();
}

