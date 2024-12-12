import React, { createContext, useContext, useState, ReactNode } from "react";

type TokenContextType = {
  selectedToken: string;
  setSelectedToken: (token: string) => void;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedToken, setSelectedToken] = useState<string>("bitcoin"); // Default токен

  return (
    <TokenContext.Provider value={{ selectedToken, setSelectedToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within a TokenProvider");
  return context;
};
