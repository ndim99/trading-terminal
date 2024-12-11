import Chart from "@/components/Chart";
import Container from "@/components/Container";
import LatestOrders from "@/components/LatestOrders";
import TokenInfoComponent from "@/components/TokenInfoComponent";
import Trade from "@/components/Trade";

export default function Home() {
  return (
    <Container>
      <div className="flex items-center 2xl:gap-3 gap-2 h-screen">
        <div className="flex flex-col 2xl:gap-3 gap-2 lg:w-1/4">
          <Trade />
          <TokenInfoComponent />
        </div>
        <div className="flex flex-col 2xl:gap-3 gap-2 lg:w-3/4 h-full">
          <Chart />
          <LatestOrders />
        </div>
      </div>
    </Container>
  );
}
