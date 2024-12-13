import Chart from "@/components/Chart";
import LatestOrders from "@/components/LatestOrders";
import SubHeader from "@/components/SubHeader";
import TokenInfo from "@/components/TokenInfo";
import TokenSearchBar from "@/components/TokenSearch";
import Trade from "@/components/Trade";
import { useState } from "react";

export default function Home() {
  const [screen, setScreen] = useState("Trade");
  return (
    <div className="flex flex-col p-2.5 gap-2.5 w-full">
      <SubHeader screen={screen} setScreen={setScreen} />
      <TokenSearchBar />
      <div className="lg:flex hidden gap-2.5 h-screen">
        <div className="flex flex-col gap-2.5 lg:w-1/4">
          <Trade />
          <TokenInfo />
        </div>
        <div className="flex flex-col gap-2.5 lg:w-3/4 h-full">
          <Chart />
          <LatestOrders />
        </div>
      </div>
      <div className="lg:hidden flex">
        {screen === "Trade" ? (
          <Trade />
        ) : screen === "Chart" ? (
          <Chart />
        ) : screen === "Info" ? (
          <TokenInfo />
        ) : (
          <LatestOrders />
        )}
      </div>
    </div>
  );
}
