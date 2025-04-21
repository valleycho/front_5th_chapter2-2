import { useCallback, useState } from "react";


export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleAdmin = useCallback(() => {
    setIsAdmin(!isAdmin);
  }, [isAdmin]);

  return {
    isAdmin,
    handleToggleAdmin,
  };
};
