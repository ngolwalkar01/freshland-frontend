export const decodeString = (txt) => {
    return txt ? decodeURIComponent(txt) : txt
}

export const getCorrectPrice = (number, currency_minor_unit) => {
    if (currency_minor_unit) {
        const value = parseFloat((number / 100).toFixed(currency_minor_unit));
        return Math.round(value);
    }
    return number;
};