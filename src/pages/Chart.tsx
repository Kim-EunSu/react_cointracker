import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";

interface IStand {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

function Chart() {
  const { coinId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [stand, setStand] = useState<IStand[]>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
      );
      const json = await response.json();
      setStand(json);
      setIsLoading(false);
    })();
  }, [coinId]);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {stand?.map((item) => (
            <div key={item.close}>
              <ApexChart
                type="line"
                series={[
                  // series는 보내고 싶은 모든 data
                  {
                    name: "sales",
                    data: Number(item?.close) as unknown as number[],
                  },
                ]}
                options={{
                  chart: {
                    height: 500,
                    width: 500,
                  },
                  theme: {
                    mode: "dark",
                  },
                  stroke: {
                    curve: "smooth",
                    width: 4,
                  },
                  fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["yellow"], stops: [0, 100] },
                  },

                  xaxis: {
                    type: "datetime",
                    categories: item?.time_close * 1000,
                  },
                  colors: ["skyblue"],
                }}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Chart;
