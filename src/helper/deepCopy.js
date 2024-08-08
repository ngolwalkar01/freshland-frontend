export const deepCopyArray = (array) => {
    return array.map(item => {
        return { ...item };
    });
}