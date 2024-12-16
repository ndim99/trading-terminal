import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/providers";
import { TokenData } from "@/types";

export default function TokenSearchBar() {
  const { selectedToken, setSelectedToken } = useToken();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchTopTokens = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }
        );
        setTokens(response.data);
      } catch (error) {
        console.error("Error fetching top tokens:", error);
      }
    };

    fetchTopTokens();
  }, []);

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-600 rounded-md text-white">
      <div className="border border-gray-600 rounded-md">
        <p className="font-semibold fontSizeFromLg px-2 py-1.5 uppercase">
          {selectedToken.symbol}
        </p>
      </div>
      <div className="relative w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search token..."
          className="px-2 py-1.5 border border-gray-600 rounded-md w-full outline-0 bg-gray-900 fontSizeFromLg"
          onClick={() => setShowMore((prevState) => !prevState)}
        />
        {showMore && (
          <ul className="absolute bg-gray-900 border border-gray-600 w-full mt-1 max-h-40 overflow-y-auto z-50 rounded-md">
            {filteredTokens.map((token) => (
              <li
                key={token.id}
                onClick={() => {
                  setSelectedToken(token);
                  setSearch("");
                  setShowMore(false);
                }}
                className={`${
                  selectedToken.id === token.id
                    ? "text-secondary-colors cursor-not-allowed bg-gray-800"
                    : "text-primary-colors hover:bg-gray-700"
                } px-2 py-1.5 cursor-pointer font-normal  fontSizeFromLg`}
              >
                {token.name} ({token.symbol.toUpperCase()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
