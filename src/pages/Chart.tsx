import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApexChart from "../components/ApexChart";

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
  const [stand, setStand] = useState<IStand>();

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

  console.log(stand);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {stand.map((item) => {
            <ApexChart item={item} />;
          })}
        </>
      )}
    </div>
  );
}

export default Chart;
