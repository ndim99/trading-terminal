import React, { useEffect, useRef, useCallback } from "react";
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { useFetchChartData } from "@/hooks/useFetchChartData";

export default function Chart() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const resizeChart = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      const { width, height } =
        chartContainerRef.current.getBoundingClientRect();
      chartRef.current.applyOptions({ width, height });
    }
  }, []);

  const { chartData } = useFetchChartData();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "#010109" },
        textColor: "#d1d4dc",
        fontSize: 12,
        fontFamily: "Arial, sans-serif",
      },
      grid: {
        vertLines: { color: "#2e2e2e", style: 1 },
        horzLines: { color: "#2e2e2e", style: 1 },
      },
      timeScale: {
        borderColor: "#3e3e3e",
      },
    });

    candleSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    resizeChart();

    window.addEventListener("resize", resizeChart);

    return () => {
      chartRef.current?.remove();
      window.removeEventListener("resize", resizeChart);
    };
  }, [resizeChart]);

  useEffect(() => {
    if (chartData && candleSeriesRef.current) {
      candleSeriesRef.current.setData(chartData);
    }
  }, [chartData]);

  return (
    <div className="box w-full lg:h-2/3 h-[500px] p-2.5">
      <div
        ref={chartContainerRef}
        className="relative rounded-md w-full h-full"
      ></div>
    </div>
  );
}
