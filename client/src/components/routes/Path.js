import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Main from "../Videos/Main";

import SimplePlayer from "../Videos/Player";
import Notification from "../Notification/Notification";

import Subscriptions from "../Pages/Subscription";

const Paths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route exact path="/uploadvideo" element={<Main />} />
      <Route exact path="/player/:creatorId/:id" element={<SimplePlayer />} />

      <Route exact path="/notifications" element={<Notification />} />
    </Routes>
  );
};

export default Paths;
