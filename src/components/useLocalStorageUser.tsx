import { useEffect, useState } from 'react';

export const useLocalStorageUser = () => {
  const [user, setUser] = useState<{ email: string | null; displayName: string | null } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return user;
};