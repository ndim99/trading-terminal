import { TOKEN_INFO_KEY, TOKEN_INFO_REFETCH_INTERVAL } from "@/common/consts";
import { useToken } from "@/providers";
import { fetchTokenInfo } from "@/utils/fetchTokenInfo";
import { useQuery } from "@tanstack/react-query";

export const useFetchTokenInfo = () => {
  const { selectedToken } = useToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: [TOKEN_INFO_KEY, selectedToken],
    queryFn: () => fetchTokenInfo(selectedToken.id),
    refetchInterval: TOKEN_INFO_REFETCH_INTERVAL,
    enabled: !!selectedToken,
  });

  return { data, isLoading, isError };
};
