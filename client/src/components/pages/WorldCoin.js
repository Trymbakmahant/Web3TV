import { WorldIDWidget } from "@worldcoin/id";
import { useContext } from "react";
import { AppContext } from "../context/AddressContext";
const WorldCoin = () => {
  const ctx = useContext(AppContext);
  return (
    <div style={{ margin: "15% 37%" }}>
      {" "}
      <WorldIDWidget
        actionId="wid_staging_719d782ac38be75a36cbba66c90828e4" // obtain this from developer.worldcoin.org
        signal={ctx.sharedState.contract.accountAddress}
        enableTelemetry
        onSuccess={(obj) => {
          console.log(obj);
          const { merkle_root, nullifier_hash, proof } = obj;
          ctx.sharedState.provideWorldCoinAddress(
            ctx.sharedState.contract.accountAddress,
            merkle_root,
            nullifier_hash,
            proof
          );
        }} // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
    </div>
  );
};

export default WorldCoin;
