import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useState, CSSProperties, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  position: "fixed",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.titleColor};
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 1.2rem;
  border-radius: 30px;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const BoxTitle = styled.h3`
  font-weight: 700;
`;

const BoxDesc = styled.h4``;

const Desc = styled.p`
  padding: 30px;
  text-align: center;
  line-height: 1.3;
  color: #999999;
`;

const TapWrapper = styled.div`
  display: flex;
  padding: 1.5rem 0;
  justify-content: space-around;
`;

const Tab = styled.div<{ isActive: boolean }>`
  padding: 1rem 2rem;
  border-radius: 20px;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? "700" : "")};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

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

  const ChartMatch = useMatch(`/:coinId/chart`);
  console.log(ChartMatch);
  const PriceMatch = useMatch("/:coinId/price");

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

      setInfo(infojson);
      setPrice(pricejson);
      setLoading(false);
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
        <>
          <InfoWrapper>
            <BoxWrapper>
              <BoxWrap>
                <BoxTitle>Rank</BoxTitle>
                <BoxDesc>{info?.rank}</BoxDesc>
              </BoxWrap>
              <BoxWrap>
                <BoxTitle>Symbol</BoxTitle>
                <BoxDesc>${info?.symbol}</BoxDesc>
              </BoxWrap>
            </BoxWrapper>

            <Desc>{info?.description}</Desc>

            <BoxWrapper>
              <BoxWrap>
                <BoxTitle>Toal_Suply</BoxTitle>
                <BoxDesc>{price?.total_supply.toFixed(0)}</BoxDesc>
              </BoxWrap>
              <BoxWrap>
                <BoxTitle>Max_Suply</BoxTitle>
                <BoxDesc>{price?.max_supply}</BoxDesc>
              </BoxWrap>
            </BoxWrapper>

            <TapWrapper>
              <Tab isActive={ChartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={PriceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </TapWrapper>
            <Outlet />
          </InfoWrapper>
        </>
      )}
    </>
  );
}

export default Coin;
