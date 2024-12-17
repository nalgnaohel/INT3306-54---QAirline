import React, { createContext, useContext, useState } from 'react';

interface TableContextProps {
  activeTable: number | null;
  setActiveTable: (id: number | null) => void;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTable, setActiveTable] = useState<number | null>(null);

  return (
    <TableContext.Provider value={{ activeTable, setActiveTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): TableContextProps => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};