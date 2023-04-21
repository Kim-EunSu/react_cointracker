import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, CSSProperties } from "react";
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

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  console.log(state);

  const [loading, setLoading] = useState(true);

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
      ) : null}
    </>
  );
}

export default Coin;
