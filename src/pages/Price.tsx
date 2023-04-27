import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";

const BoxWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const BoxWrap = styled.div`
  padding: 1.2rem;
  border-radius: 20px;
  background: white;
`;

const BoxTitle = styled.h2`
  color: #b0b0b0;
`;

const BoxDesc = styled.h3`
  font-size: 2rem;
  padding: 0.8rem 0 0;
`;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <BoxWrapper>
            <BoxWrap>
              <BoxTitle>From 1H ago</BoxTitle>
              <BoxDesc> {stand?.quotes.USD.percent_change_1h}%</BoxDesc>
            </BoxWrap>
            <BoxWrap>
              <BoxTitle>From 6H ago</BoxTitle>
              <BoxDesc> {stand?.quotes.USD.percent_change_6h}%</BoxDesc>
            </BoxWrap>
            <BoxWrap>
              <BoxTitle>From 12H ago</BoxTitle>
              <BoxDesc>{stand?.quotes.USD.percent_change_12h}%</BoxDesc>
            </BoxWrap>
            <BoxWrap>
              <BoxTitle>From 24H ago</BoxTitle>
              <BoxDesc>{stand?.quotes.USD.percent_change_24h}%</BoxDesc>
            </BoxWrap>
            <BoxWrap>
              <BoxTitle>From 7D ago</BoxTitle>
              <BoxDesc>{stand?.quotes.USD.percent_change_7d}%</BoxDesc>
            </BoxWrap>
            <BoxWrap>
              <BoxTitle>From 30D ago</BoxTitle>
              <BoxDesc>{stand?.quotes.USD.percent_change_30d}%</BoxDesc>
            </BoxWrap>
          </BoxWrapper>
        </>
      )}
    </>
  );
}
