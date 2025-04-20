import { useState } from "react";


export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return {
        isAdmin,
        setIsAdmin
    }
}