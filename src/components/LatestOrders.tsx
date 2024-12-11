import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestOrders } from "@/utils/fetchLatestOrders";
import { formatDistanceToNow } from "date-fns";
import {
  LATEST_ORDERS_KEY,
  LATEST_ORDERS_REFETCH_INTERVAL,
} from "@/common/consts";
import { formatPrice } from "@/utils/priceFormatting";

export default function LatestOrders() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LATEST_ORDERS_KEY],
    queryFn: () => fetchLatestOrders(),
    refetchInterval: LATEST_ORDERS_REFETCH_INTERVAL,
  });

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error fetching orders</div>;

  return (
    <div className="box flex flex-col gap-2.5">
      <p className="px-2.5 pt-2.5 text-primary-colors fontSizeFromLg font-semibold">
        Latest Orders
      </p>
      <table className="w-full text-left border-collapse text-white">
        <thead>
          <tr className="bg-[#010109]">
            <th className="p-2 border-y border-gray-700">Price (USD)</th>
            <th className="p-2 border-y border-gray-700 text-start">Volume</th>
            <th className="p-2 border-y border-gray-700 text-center">Type</th>
            <th className="p-2 border-y border-gray-700 text-end">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
              <td className="p-2 border-y border-gray-700">
                {formatPrice(order.price)}
              </td>
              <td className="p-2 border-y border-gray-700 text-start">
                {formatPrice(order.qty)} BTC
              </td>
              <td
                className={`p-2 border-y border-gray-700 text-center ${
                  order.isBuyerMaker ? "text-red-500" : "text-green-500"
                }`}
              >
                {order.isBuyerMaker ? "Sell" : "Buy"}
              </td>
              <td className="p-2 border-y border-gray-700 text-end">
                {formatDistanceToNow(order.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
