import { TokenData } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TokenContextType = {
  selectedToken: TokenData;
  setSelectedToken: (token: TokenData) => void;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedToken, setSelectedToken] = useState<TokenData>({
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
  });

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
