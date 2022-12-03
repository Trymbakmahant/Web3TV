import { Routes, Route } from "react-router-dom";

import Main from "../Videos/Main";

import WorldCoin from "../Pages/WorldCoin";
import SimplePlayer from "../Videos/Player";

import UploadHOme from "../Videos/Home";
import Home from "../Home/Home";
import LiveStreaming from "../Videos/LiveStream";
const Paths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<WorldCoin />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/uploadvideo" element={<Main />} />
      <Route exact path="/player/:id" element={<SimplePlayer />} />
      <Route exact path="/UploadHome" element={<UploadHOme />} />

      <Route exact path="/LiveStream" element={<LiveStreaming />} />
    </Routes>
  );
};

export default Paths;
