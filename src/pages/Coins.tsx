import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  useEffect(() => {
    axios
      .get("https://api.coinpaprika.com/v1/coins")
      .then((res) => setCoins(res.data));
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>Coin Tracker</Title>
        </Header>
        <CoinList>
          {coins.slice(0, 100).map((item) => (
            <Coin key={item.id}>
              <Link to={`/${item.name}`}>{item.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinList>
      </Container>
    </>
  );
}

export default Coins;
