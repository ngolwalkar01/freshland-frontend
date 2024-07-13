const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
}

const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

const removeLocalStorage = (key: string, isDispatchEvent = true) => {
    localStorage.removeItem(key);

    if (isDispatchEvent)
        window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
}

const clearLocalStorage = () => {
    localStorage.clear();
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage
};
