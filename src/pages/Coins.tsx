import styled from "styled-components";
import { useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div``;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  color: #rgb(71 71 71);
`;

const CoinList = styled.ul`
  padding: 1rem;
`;

const Coin = styled.li`
  background-color: white;
  padding: 20px;
  margin: 1rem;
  border-radius: 15px;
  a {
    display: block;
    transition: color 0.3s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const override: CSSProperties = {
  position: "fixed",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coinpaprika.com/v1/coins")
      .then((res) => setCoins(res.data));
    setLoading(true);
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Coin Tracker</Title>
        </Header>
        {loading ? (
          <PropagateLoader
            color="#a1a198"
            size={10}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <CoinList>
            {coins.slice(0, 100).map((item) => (
              <Coin key={item.id}>
                <Link to={`/${item.name}`}>{item.name} &rarr;</Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
}

export default Coins;
