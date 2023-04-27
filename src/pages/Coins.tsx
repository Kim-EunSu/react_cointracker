import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  text-transform: uppercase;
  margin: 0 10px;

  color: ${(props) => props.theme.titleColor};
`;

const ToggleButton = styled.button`
  font-size: 2rem;
  size: 4rem;
  border: none;
  background-color: transparent;
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
    display: flex;
    align-items: center;
    transition: color 0.3s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

// interface CoinInterface {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   is_new: boolean;
//   is_active: boolean;
//   type: string;
// }

interface CoinInterface {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

interface ICoinsProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

function Coins({ isDark, toggleDarkMode }: ICoinsProps) {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("https://api.coinpaprika.com/v1/ticker")
  //     .then((res) => setCoins(res.data));
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/")
      .then((res) => setCoins(res.data));
    setLoading(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>CoinTracker</title>
      </Helmet>
      <Container>
        <Header>
          <Title>Coin Tracker</Title>
          <ToggleButton onClick={toggleDarkMode}>
            {isDark ? "🌼" : "🌸"}
          </ToggleButton>
        </Header>
        {loading ? (
          <Loader />
        ) : (
          <CoinList>
            {coins.map((item) => (
              <Coin key={item.id}>
                <Link to={`/${item.id}`} state={{ name: item.name }}>
                  <Image src={item.image.small} alt="coin" />
                  {item.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Container>
    </>
  );
}

export default Coins;
