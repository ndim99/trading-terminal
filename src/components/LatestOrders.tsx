import React from "react";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "@/utils/priceFormatting";
import { useFetchLatestOrders } from "@/hooks/useFetchLatestOrders";

export default function LatestOrders() {
  const { latestOrders, isLoading, isError } = useFetchLatestOrders();

  return (
    <>
      {isLoading ? (
        <div className="fontSizeFromXl font-normal text-white">
          Loading orders...
        </div>
      ) : isError ? (
        <div className="fontSizeFromXl font-normal text-white">
          Error fetching orders
        </div>
      ) : (
        <div className="box flex flex-col gap-2.5">
          <p className="px-2.5 pt-2.5 text-primary-colors fontSizeFromLg font-semibold">
            Latest Orders
          </p>
          <table className="w-full text-left border-collapse text-white">
            <thead>
              <tr className="bg-[#010109]">
                <th className="p-2 border-y border-gray-700">Price (USD)</th>

                <th className="p-2 border-y border-gray-700 text-center">
                  Type
                </th>
                <th className="p-2 border-y border-gray-700 text-end">Time</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders?.map(
                (order: { price: number; side: string; time: Date }) => (
                  <tr
                    key={order.price}
                    className="odd:bg-gray-800 even:bg-gray-700"
                  >
                    <td className="p-2 border-y border-gray-700">
                      {formatPrice(order.price)}
                    </td>

                    <td
                      className={`p-2 border-y border-gray-700 text-center ${
                        order.side ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {order.side ? "Sell" : "Buy"}
                    </td>
                    <td className="p-2 border-y border-gray-700 text-end">
                      {formatDistanceToNow(order.time)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
