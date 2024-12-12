import {
  LATEST_ORDERS_KEY,
  LATEST_ORDERS_REFETCH_INTERVAL,
} from "@/common/consts";
import { useToken } from "@/providers";
import { fetchLatestOrders } from "@/utils/fetchLatestOrders";
import { useQuery } from "@tanstack/react-query";

export const useFetchLatestOrders = () => {
  const { selectedToken } = useToken();

  const {
    data: latestOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LATEST_ORDERS_KEY, selectedToken],
    queryFn: () => fetchLatestOrders(selectedToken),
    refetchInterval: LATEST_ORDERS_REFETCH_INTERVAL,
    enabled: !!selectedToken,
  });

  return { latestOrders, isLoading, isError };
};
