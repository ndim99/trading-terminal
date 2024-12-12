import axios from "axios";

export const fetchLatestOrders = async (selectedToken: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedToken}/market_chart`,
      {
        params: { vs_currency: "usd", days: "1" },
      }
    );

    if (
      !response.data ||
      !response.data.prices ||
      !response.data.total_volumes
    ) {
      throw new Error("No data received from CoinGecko API");
    }

    const formattedOrders = response.data.prices
      .slice(-10)
      .reverse()
      .map((price: [number, number]) => {
        return {
          time: new Date(price[0]),
          price: price[1],
          side: Math.random() > 0.5 ? "buy" : "sell",
        };
      });
    return formattedOrders;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
