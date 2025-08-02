import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const today = dayjs();

export function getFreeShippingDate() {
    return today.add(7, 'day').format('dddd, MMMM DD');
}

export function getStandardShippingDate() {
    return today.add(3, 'day').format('dddd, MMMM DD');
}

export function getExpressShippingDate() {
    return today.add(1, 'day').format('dddd, MMMM DD');
}

export function getShippingDate(optionId) {
    if (optionId === '1') {
        return getFreeShippingDate();
    } else if (optionId === '2') {
        return getStandardShippingDate();
    } else if (optionId === '3') {
        return getExpressShippingDate();
    }
}


