import Chart from "@/components/Chart";
import LatestOrders from "@/components/LatestOrders";
import TokenInfo from "@/components/TokenInfo";
import TokenSearchBar from "@/components/TokenSearch";
import Trade from "@/components/Trade";

export default function Home() {
  return (
    <div className="flex flex-col p-2.5 gap-2.5 w-full">
      <TokenSearchBar />
      <div className="flex items-center gap-2.5 h-screen">
        <div className="flex flex-col gap-2.5 lg:w-1/4">
          <Trade />
          <TokenInfo />
        </div>
        <div className="flex flex-col gap-2.5 lg:w-3/4 h-full">
          <Chart />
          <LatestOrders />
        </div>
      </div>
    </div>
  );
}
