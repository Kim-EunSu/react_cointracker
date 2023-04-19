import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function Coin() {
  const { coinId } = useParams();
  console.log(coinId);
  return <Title>Coin :{coinId}</Title>;
}

export default Coin;
