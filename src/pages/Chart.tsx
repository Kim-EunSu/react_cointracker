import { useOutletContext } from "react-router-dom";

interface ChildProps {
  coinId: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<ChildProps>();

  console.log(coinId);
  return <div>dd</div>;
}
