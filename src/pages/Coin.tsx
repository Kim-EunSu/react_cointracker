import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, CSSProperties, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.textColor};
`;

const override: CSSProperties = {
  position: "fixed",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

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

function Coin() {
  const [loading, setLoading] = useState(true);

  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;

  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData =
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}
      `);
      const infojson = await infoData.json();

      const priceData =
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}
      `);
      const pricejson = await priceData.json();

      setLoading(false);
      setInfo(infojson);
      setPrice(pricejson);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title>{state?.name || "SecretMode Loading..."}</Title>
      {loading ? (
        <PropagateLoader
          color="#a1a198"
          size={10}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <span>{info?.rank}</span>
      )}
    </>
  );
}

export default Coin;
