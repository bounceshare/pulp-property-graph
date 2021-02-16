export const handleJSON = (value: any) => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};
export const handleStringify = (value: any) => {
    return value !== null && (typeof value === "object" || Array.isArray(value))
        ? JSON.stringify(value)
        : value;
};
