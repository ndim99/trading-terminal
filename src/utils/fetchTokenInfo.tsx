import axios from "axios";

export const fetchTokenInfo = async (selectedToken: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedToken}`,
      {
        params: { localization: "false" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching token info:", error);
    throw error;
  }
};
