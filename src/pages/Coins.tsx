import styled from "styled-components";
import { Link } from "react-router-dom";

const array = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div``;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
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

function Coins() {
  return (
    <>
      <Container>
        <Header>
          <Title>Coin Tracker</Title>
        </Header>
        <CoinList>
          {array.map((item) => (
            <Coin key={item.id}>
              <Link to={`/${item.name}`} key={item.id}>
                {item.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      </Container>
    </>
  );
}

export default Coins;
