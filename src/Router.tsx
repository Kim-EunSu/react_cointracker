import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";

interface IRouterProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

function Router({ isDark, toggleDarkMode }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Coins isDark={isDark} toggleDarkMode={toggleDarkMode} />}
        />
        <Route path="/:coinId" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
