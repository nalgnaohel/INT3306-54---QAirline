import React, { createContext, useContext, useState } from 'react';

interface UserContextProps {
  activeContent: number | null;
  setActiveContent: (id: number | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeContent, setActiveContent] = useState<number | null>(0);

  return (
    <UserContext.Provider value={{ activeContent, setActiveContent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};