import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Main from "../Videos/Main";
import MyDropzone from "../IpfsUse/Uploadfiles";
import SimplePlayer from "../Videos/Player";
import Notification from "../Notification/Notification";
import UploadHOme from "../Videos/Home";
import Subscriptions from "../Pages/Subscription";
const Paths = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/UploadFiles" element={<MyDropzone />} />
      <Route exact path="/uploadvideo" element={<Main />} />
      <Route exact path="/player/:creatorId/:id" element={<SimplePlayer />} />
      <Route exact path="/UploadHome" element={<UploadHOme />} />
      <Route exact path="/notifications" element={<Notification />} />
    </Routes>
  );
};

export default Paths;
