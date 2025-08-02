export function formatCurrency(num) {
    return (num / 100).toFixed(2);
}

export function getTotalCost(totalSF, productsCostCents, taxCents){
    return totalSF + productsCostCents + taxCents;
}

function getShippingFee(selected){
    if(selected.value === 'free')
        return 0;
    else if (selected.value === '499' || selected.value === '999') 
        return parseInt(selected.value);
    else
        return -1;
}

let isAllowedtoPlaceOrder = true;

export function calcTotalShippingFee(cart){
    let totalSF = 0;
    cart.forEach(item => {
        const selected = document.querySelector(`input[name="delivery-option-${item.productId}"]:checked`);
        
        try{
            if(getShippingFee(selected) === -1){
                totalSF += 0;
                throw new Error();
            } else {
                totalSF += getShippingFee(selected);
            }
        } catch {
            isAllowedtoPlaceOrder = false;
        }
    });
    return totalSF;
}