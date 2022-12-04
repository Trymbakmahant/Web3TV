import "./App.css";
import Navbar from "./components/Pages/Navbar";
import Footer from "./components/Footer/Footer";
import Path from "./components/routes/Path";
import WorldCoin from "./components/Pages/WorldCoin";
import { ethers } from "ethers";
import { useEffect, useState, useContext } from "react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { AppContext } from "./components/context/AddressContext";
const client = createReactClient({
  provider: studioProvider({ apiKey: "300b138b-5f81-4e7f-9426-fa5b898d4374" }),
});

function App() {
  const [isVerified, setIsVerified] = useState(true);
  const ctx = useContext(AppContext);

  const contract = ctx.sharedState.contract.contractData;
  const accountAddress = ctx.sharedState.contract.accountAddress;

  // useEffect(() => {
  //   if (accountAddress) {
  //     (async function () {
  //       const verification = await contract.isVerified(accountAddress);
  //       setIsVerified(verification);
  //     })();
  //   }
  // }, [accountAddress]);

  return (
    <>
      {isVerified ? (
        <div>
          <LivepeerConfig client={client}>
            <Navbar />
            <Path />
            <Footer />
          </LivepeerConfig>
        </div>
      ) : (
        <div>
          <Navbar />
          <WorldCoin />
        </div>
      )}
    </>
  );
}

export default App;
