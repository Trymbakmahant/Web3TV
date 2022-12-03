import { Routes, Route } from "react-router-dom";

// import Home from "../home/Home";

import WorldCoin from "../pages/WorldCoin";

const Paths = () => {
  return (
    <Routes>
      {/* <Route exact path="/home" element={<Home />} /> */}
      <Route exact path="/" element={<WorldCoin />} />
    </Routes>
  );
};

export default Paths;
