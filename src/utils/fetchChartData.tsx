import axios from "axios";

export const fetchChartData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      {
        params: { vs_currency: "usd", days: "1" },
      }
    );

    const formattedCandlestickData = response.data.prices.map(
      (price: [number, number], index: number, prices: [number, number][]) => {
        const open = prices[index - 1] ? prices[index - 1][1] : price[1];
        const close = price[1];
        const high = Math.max(open, close);
        const low = Math.min(open, close);
        return {
          time: price[0] / 1000, // convert ms to seconds
          open: open,
          high: high,
          low: low,
          close: close,
        };
      }
    );

    return formattedCandlestickData;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};
