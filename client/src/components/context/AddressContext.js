import { createContext, useState } from "react";
import { ethers } from "ethers";

export const AppContext = createContext({});

const AppWrapper = (props) => {
    const [contract, setContract] = useState({
        provider: null,
        signer: null,
        contractData: null,
        accountAddress: null
    });

    const [http, setHttp] = useState(null);

  const provideWorldCoinAddress = async (
    signal,
    root,
    nullifierHash,
    proof
  ) => {
    const unpackedProof = ethers.utils.defaultAbiCoder.decode(
      ["uint256[8]"],
      proof
    )[0];

    const root1 = ethers.BigNumber.from(root);
    const nullifier = ethers.BigNumber.from(nullifierHash);
    console.log(root1);
    console.log(contract.contractData);
    try {
      console.log(unpackedProof);
      const retVal = await contract.contractData.verifyAndExecute(
        signal,
        root,
        nullifier,
        unpackedProof
      );
      await retVal.wait();
      console.log("result: ", retVal);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };
  /**provideWorldCoinAddress ends here */

  
  const setData = (provider, signer, contractData, accountAddress) => {

    setContract((prevState) => {
        return {
            provider,
            signer,
            contractData,
            accountAddress
        }
    })
}

  const setStarton = (startonUrl) => {
    setHttp(startonUrl);
  }

  const sharedState = {
    setData,
    contract,
    provideWorldCoinAddress,
    setStarton,
    http
  };

  return (
    <AppContext.Provider value={{ sharedState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppWrapper;
