import React from "react";
import { useFetchTokenInfo } from "@/hooks/useFetchTokenInfo";
import TokenInfoBox from "./TokenInfoBox";
import { formatPrice } from "@/utils/priceFormatting";
import { formatNumericAmountCompact } from "@/utils/formatting";

export default function TokenInfo() {
  const { data, isLoading, isError } = useFetchTokenInfo();

  return (
    <div className="p-2.5 border rounded-md shadow-md flex flex-col gap-2.5">
      <h2 className="fontSizeFromLg font-semibold text-white">Token Info</h2>
      {isError ? (
        <div className="text-white fontSizeFromLg font-semibold">
          Error loading token info.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          <TokenInfoBox
            isLoading={isLoading}
            title="Price"
            value={formatPrice(
              data?.market_data.current_price.usd &&
                data.market_data.current_price.usd
            )}
          />
          <TokenInfoBox
            isLoading={isLoading}
            title="Market Cap"
            value={formatNumericAmountCompact(
              data?.market_data.market_cap.usd &&
                data.market_data.market_cap.usd
            )}
          />
          <TokenInfoBox
            isLoading={isLoading}
            title="24h Volume"
            value={formatNumericAmountCompact(
              data?.market_data.total_volume.usd &&
                data.market_data.total_volume.usd
            )}
          />
          <TokenInfoBox
            isLoading={isLoading}
            title="Total Supply"
            value={formatNumericAmountCompact(
              data?.market_data.total_supply && data.market_data.total_supply
            )}
          />
          <TokenInfoBox
            isLoading={isLoading}
            title="Circulating Supply"
            value={formatNumericAmountCompact(
              data?.market_data.circulating_supply &&
                data.market_data.circulating_supply
            )}
          />
          <TokenInfoBox isLoading={isLoading} title="Holders" value={"N/A"} />
        </div>
      )}
    </div>
  );
}
