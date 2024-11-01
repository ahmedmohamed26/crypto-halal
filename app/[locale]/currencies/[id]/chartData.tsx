import { FC, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTranslations } from "next-intl";

interface LineChartProps {
  data: { timestamp: string; price: number }[];
  isLoading: boolean;
}

export const ChartData: FC<LineChartProps> = ({ data, isLoading }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const t = useTranslations("Currencies");
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data.map((item) =>
            new Date(item.timestamp).toLocaleDateString()
          ),
          datasets: [
            {
              label: t("priceUSD"),
              data: data.map((item: any) => item.quote.USD.price),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: t("date") },
            },
            y: {
              title: { display: true, text: t("priceUSD") },
              beginAtZero: false,
            },
          },
          plugins: {
            legend: { display: true, position: "top" },
            tooltip: { enabled: true, mode: "index", intersect: false },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};
