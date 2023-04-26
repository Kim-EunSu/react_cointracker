import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";

const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, auto));
`;

const BoxWrap = styled.div``;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Price() {
  const { coinId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [stand, setStand] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      const data = await response.json();
      setStand(data);
      setIsLoading(false);
      console.log(stand);
    })();
  }, [coinId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BoxWrapper>
            <BoxWrap>{stand?.quotes.USD.percent_change_30m}</BoxWrap>
            <BoxWrap>{stand?.quotes.USD.percent_change_1h}</BoxWrap>
            <BoxWrap>{stand?.quotes.USD.percent_change_6h}</BoxWrap>
            <BoxWrap>{stand?.quotes.USD.percent_change_12h}</BoxWrap>
            <BoxWrap>{stand?.quotes.USD.market_cap_change_24h}</BoxWrap>
            <BoxWrap>{stand?.quotes.USD.percent_change_30d}</BoxWrap>
          </BoxWrapper>
        </>
      )}
    </>
  );
}
