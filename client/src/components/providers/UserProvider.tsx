import { type ReactNode, useEffect, useState } from "react";
import type { User } from "../../types.ts";
import {UserContext} from "../contexts/userContext.ts"

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider(props: UserProviderProps) {
  const children = props.children;

  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/me', {
        credentials: 'include'
      });

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error(`Error fetching user: ${ response.statusText }`);
      }
      const data = await response.json();
      console.log(data);
      
      console.log("Do we have an avatar?", data.avatar);
      const avatarURL = data.avatar ?
        `https://cdn.discordapp.com/avatars/${ data.id }/${ data.avatar }.png` :
        `https://cdn.discordapp.com/embed/avatars/0.png`;

      setUser({ ...data, avatarURL });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setUser(null);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(import.meta.env.VITE_API_URL + '/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };
  
  const refreshUser = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    await fetchUser();
    setLoading(false);
  }
  
  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
      setLoading(false);
    };
    
    initializeUser()
  }, []);
  
  return (
    <UserContext.Provider value={{user, loading, error, logout, refreshUser}}>
      {children}
    </UserContext.Provider>
  )
}


