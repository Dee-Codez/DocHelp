import { useEffect } from "react";
import { useState } from "react";


function useSessionStorage(key) {
    const [value, setValue] = useState(() => {
        return sessionStorage.getItem(key);
    });

    useEffect(() => {
        const newValue = sessionStorage.getItem(key);
        if (value !== newValue) {
            setValue(newValue);
        }
        });
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
            setValue(e.newValue);
            }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
    }, [key, value]);

    return value;
}


export default useSessionStorage
