import { CSSProperties } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  textAlign: "center",
};

export default function Loader() {
  return (
    <>
      <PropagateLoader
        color="#a1a198"
        size={10}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}
