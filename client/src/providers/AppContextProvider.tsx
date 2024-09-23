import React, { createContext, ReactNode, useContext, useEffect } from "react";
import useSWR, { mutate } from "swr";

// Define the shape of the context state
interface AppContextState {
  isDarkMode: boolean | undefined;
  setIsDarkMode: (value: boolean) => void;
  isSidebarCollapsed: boolean | undefined;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Initialize the context with default values
const AppContext = createContext<AppContextState | undefined>(undefined);

// SWR keys for caching
const isDarkModeKey = "isDarkMode";
const isSidebarCollapsedKey = "isSidebarCollapsed";

// Helper to get values from `localStorage`
const getLocalStorage = <T,>(key: string, fallbackValue: T): T => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  }
  return fallbackValue;
};

// Helper to set values in `localStorage`
const setLocalStorage = <T,>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Create a provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // Fetch persisted state from localStorage or use defaults
  const { data: isDarkMode } = useSWR(isDarkModeKey, () =>
    getLocalStorage(isDarkModeKey, false),
  );
  const { data: isSidebarCollapsed } = useSWR(isSidebarCollapsedKey, () =>
    getLocalStorage(isSidebarCollapsedKey, false),
  );

  // Functions to update state using `mutate` to update the SWR cache and localStorage
  const setIsDarkMode = (value: boolean) => {
    setLocalStorage(isDarkModeKey, value);
    mutate(isDarkModeKey, value, false); // Optimistic update
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    setLocalStorage(isSidebarCollapsedKey, collapsed);
    mutate(isSidebarCollapsedKey, collapsed, false); // Optimistic update
  };

  // Sync localStorage with SWR cache on page load
  useEffect(() => {
    const storedDarkMode = getLocalStorage(isDarkModeKey, false);
    const storedSidebarCollapsed = getLocalStorage(
      isSidebarCollapsedKey,
      false,
    );

    mutate(isDarkModeKey, storedDarkMode, false); // Sync SWR with localStorage
    mutate(isSidebarCollapsedKey, storedSidebarCollapsed, false); // Sync SWR with localStorage
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        isSidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context in other components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
