// src/providers/index.tsx
import { SWRConfig } from "swr";
import { AppContextProvider } from "./AppContextProvider";
import { ReactNode } from "react";
import { SWRProvider } from "./SWRProvider";

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </SWRProvider>
  );
};

export default RootProvider;
