import { Player } from "@livepeer/react";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AddressContext";
import { contractAddress } from "../constants";
import { ethers } from "ethers";
import { Revise } from "revise-sdk";
import * as PushAPI from "@pushprotocol/restapi";
import axios from "axios";

export default function SimplePlayer() {
  const [info, setInfo] = useState({
    name: null,
    description: null,
  });
  const { id, creatorId } = useParams();

  const ctx = useContext(AppContext);
  const contract = ctx.sharedState.contract?.contractData;
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzMmY1ZDRlLWM2YTUtNGU4Yi04NTI3LWM2NzEzNGNiMTZiMSIsImtleSI6Imd3bWRxOWlrIiwiaWF0IjoxNjY5NzM1MDUxfQ.dQ_hhQATRIVKIYKFqKogs36dNPtYqLH3ojfh3jDBJy8";

  useEffect(() => {
    if (contract) {
      (async function () {
        const data = await contract.getCreatorContent(creatorId);

        for (let i = 0; i < data.length; i++) {
          if (data[i].playbackID === id) {
            setInfo((prevState) => {
              return {
                name: data[i].name,
                description: data[i].description,
              };
            });
            break;
          }
        }
      })();
    }
  }, [contract]);

  const subscribeHandler = async () => {
    const http = axios.create({
      baseURL: "https://api.starton.io/v3",
      headers: {
        "x-api-key": "sk_live_14d99f8a-52f0-43ce-be7f-5176563bac12",
      },
    });
    const subscribers = await http.post(
      `/smart-contract/polygon-mumbai/${contractAddress}/read`,
      {
        functionName: "subscribers",
        params: [creatorId],
      }
    );

    if (subscribers.data.response <= 100) {
      console.log("here");
      const tx = await contract.addSubscription(creatorId, {
        value: ethers.utils.parseEther("0.001"),
      });
      await tx.wait();
      console.log("now");
    } else if (subscribers.data.response <= 10000 && subscribers > 100) {
      const tx = await contract.addSubscription(creatorId, {
        value: ethers.utils.parseEther("0.01"),
      });
      await tx.wait();
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = provider.getSigner();

    await PushAPI.channels.subscribe({
      signer: _signer,
      channelAddress: "eip155:80001:0x20647bDDa1Ce065566d73e8D702EE3f7E37f63CC", // channel address in CAIP
      userAddress: `eip155:80001:${ctx.sharedState.contract.accountAddress}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });

    const tx = await contract.mintToken(
      "https://gateway.pinata.cloud/ipfs/bafybeiau2dlojrb4jf3dz2inumz7yel4zy47pjorj3plp4yuuhu6dfycju",
      { gasLimit: 600000 }
    );
    await tx.wait();

    let currentToken = await contract.tokenId();
    currentToken = currentToken.toString();

    const revise = new Revise({ auth: AUTH_TOKEN });

    if (currentToken <= 100) {
      const tokenData = {
        name: "Member only NFT",
        image:
          "https://gateway.pinata.cloud/ipfs/bafybeiau2dlojrb4jf3dz2inumz7yel4zy47pjorj3plp4yuuhu6dfycju/silver%20tickit.png",
        tokenId: (currentToken - 1).toString(),
        description: "You are now a proud member",
      };

      const properties = [
        { nftQuality: "silver" },
        { visibility: "rare" },
        { availability: "15%" },
      ];

      const newNFT = await revise.addNFT(tokenData, properties);
      const revisionNftId = newNFT.createdNftId;

      console.log(newNFT);
      await contract.setReviseId(currentToken, revisionNftId);
    } else if (currentToken <= 10000 && currentToken > 100) {
      const tokenData = {
        name: "Member only NFT",
        image:
          "https://gateway.pinata.cloud/ipfs/bafybeifznetfar566yeq2cagadzsriqq4ivrh3yxfz7k74a5mh4yckff7q",
        tokenId: (currentToken - 1).toString(),
        description: "You are now a proud member",
      };

      const properties = [
        { nftQuality: "Gold" },
        { visibility: "legendary" },
        { availability: "7.5%" },
      ];

      const newNFT = await revise.addNFT(tokenData, properties);
      const revisionNftId = newNFT.createdNftId;
      await contract.setReviseId(creatorId, currentToken, revisionNftId);
    }
  };

  return (
    <div style={{ marginBottom: "15%" }}>
      <div style={{ width: "1100px", marginLeft: "100px", height: "550px" }}>
        <Player
          title={contract && info.name}
          playbackId={id}
          // poster={<PosterImage />}
          showPipButton
        />
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <label className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <div style={{ marginLeft: "10px" }}>{contract && info.name}</div>
          </div>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button
                className="btn btn-outline btn-success"
                onClick={subscribeHandler}
              >
                Become a Member
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "60px" }}>{contract && info.description}</div>
        <div style={{ marginLeft: "60px" }}>By {creatorId}</div>
      </div>
    </div>
  );
}
