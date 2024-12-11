import { Trade } from "@/types";
import axios from "axios";

export const fetchLatestOrders = async (): Promise<Trade[]> => {
  try {
    const response = await axios.get<Trade[]>(
      "https://api.binance.com/api/v3/trades",
      {
        params: { symbol: "BTCUSDT", limit: 10 },
      }
    );

    if (!response.data) {
      throw new Error("No data received from Binance API");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
