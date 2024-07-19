export const applyLoader = async (setLoading, fn, argsArray) => {
    setLoading(true);
    try {
        const result = await fn(...argsArray);
        setLoading(false);
        return result;
    } catch (error) {
        setLoading(false);
        throw error;
    }
};