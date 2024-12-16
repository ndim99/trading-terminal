import { CHART_DATA_KEY, CHART_DATA_REFETCH_INTERVAL } from "@/common/consts";
import { useToken } from "@/providers";
import { fetchChartData } from "@/utils/fetchChartData";
import { useQuery } from "@tanstack/react-query";

export const useFetchChartData = () => {
  const { selectedToken } = useToken();

  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [CHART_DATA_KEY, selectedToken],
    queryFn: () => fetchChartData(selectedToken.id),
    refetchInterval: CHART_DATA_REFETCH_INTERVAL,
    enabled: !!selectedToken,
  });

  return { chartData, isLoading, isError };
};
