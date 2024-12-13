import { useToken } from "@/providers";
import { useState } from "react";

export default function Trade() {
  const [orderType, setOrderType] = useState("buy");
  const { selectedToken } = useToken();
  return (
    <div className="box p-2.5 flex flex-col 2xl:gap-4 lg:gap-3 gap-2.5 w-full">
      <div className="flex items-center gap-1 bg-[#010109] fontSizeFromBase fon-normal text-white rounded-md p-2">
        This is a sample representation of how a trading component should look
      </div>
      <div className="border border-gray-600 py-1 px-2 w-full text-white flex items-center justify-between rounded-md">
        <div className="flex flex-col">
          <p className="fontSizeFromBase font-normal">Wallet Type</p>
          <p className="fontSizeFromLg font-semibold">Wallet Name</p>
        </div>
        <p className="fontSizeFromLg font-semibold">Balance: 0.0</p>
      </div>
      <div className="w-full flex items-center p-1 border border-gray-600 rounded-md gap-1">
        <button
          onClick={() => setOrderType("buy")}
          className={`${
            orderType === "buy"
              ? "bg-green-500 text-primary-colors"
              : "text-secondary-colors"
          } w-1/2 fontSizeFromLg font-semibold p-2 rounded-md`}
        >
          BUY
        </button>
        <button
          onClick={() => setOrderType("sell")}
          className={`${
            orderType === "sell"
              ? "bg-red-500 text-primary-colors"
              : "text-secondary-colors"
          } w-1/2 fontSizeFromLg font-semibold p-2 rounded-md`}
        >
          SELL
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <p className="fontSizeFromBase text-white font-normal">Amount In</p>
        <input
          placeholder="0.0"
          className="outline-0 bg-gray-900 border border-gray-600 text-white p-2 w-full rounded-md fontSizeFromLg font-semibold"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="fontSizeFromBase text-white font-normal">Amount Out</p>
        <div className="border border-gray-600 text-white p-2 w-full rounded-md fontSizeFromLg font-semibold">
          0.0
        </div>
      </div>
      <button
        className={`${
          orderType === "buy" ? "bg-green-500" : " bg-red-500"
        } w-full rounded-md p-2 fontSizeFromLg font-semibold text-primary-colors`}
      >
        {orderType === "buy" ? `Buy ${selectedToken}` : `Sell ${selectedToken}`}
      </button>
    </div>
  );
}
