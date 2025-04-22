


export const useLocalStorage = () => {
    const setLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    const getLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : null;
    }

    const removeLocalStorage = (key: string) => {
        localStorage.removeItem(key);
    }
    
    return {
        setLocalStorage,
        getLocalStorage,
        removeLocalStorage,
    }
}
