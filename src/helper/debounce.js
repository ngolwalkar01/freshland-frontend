const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const quantityDebounce = (func, wait) => {
    let timeout;
    let accumulatedValue = 0;

    return (itemKey, increment, cQ, ...args) => {
        accumulatedValue += increment;

        const later = () => {
            clearTimeout(timeout);
            func(itemKey, accumulatedValue, cQ, ...args);
            accumulatedValue = 0;
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export default debounce;
