"use client"; // Adicione isso para declarar como Client Component

import { createContext, ReactNode, useContext, useState } from "react";
// Use a versão client-side de User

interface UserContextProps {
  accountType: string | null;
  setAccountType: (accountType: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountType] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ accountType, setAccountType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
