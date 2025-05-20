'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Create context
const AppContext = createContext({} as any);

interface AppProviderProps {
  children: ReactNode;
}
const SESSION_STORAGE_KEY = 'storage_atm';
// Create a provider component
export const AppProvider = ({ children }: AppProviderProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [companyNumber, setCompanyNumber] = useState<string>('1');
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <AppContext.Provider value={{
      loading,
      setLoading,
      companyNumber,
      setCompanyNumber,
      selectedDate,
      setSelectedDate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}