import { Player } from "@livepeer/react";
//import Image from "next/image";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AddressContext";
import { contractAddress } from "../constants";
// import blenderPoster from "../../../public/images/blender-poster.png";

// const PosterImage = () => {
//   return (
//     <Image
//       src={blenderPoster}
//       layout="fill"
//       objectFit="cover"
//       priority
//       placeholder="blur"
//     />
//   );
// };

export default function SimplePlayer() {
  const { id } = useParams();
  const ctx = useContext(AppContext);
  const contract = ctx.sharedState.contract?.contractData;
  let http = ctx.sharedState.http;

  const subscribeHandler = async () => {
    const tx = await contract.addSubscripition("creator address");
    await tx.wait();

    http
      .post(`/smart-contract/polygon-mumbai/${contractAddress}/read`, {
        functionName: "showSubscribers",
        params: ["creator address"],
      })
      .then((response) => {
        const addresses = response.data.response;
        console.log(response.data.response);

        if (addresses.length <= 100) {
          //do something
        } else if (addresses.length <= 10000 && addresses.length > 100) {
          //do something
        }
      });

    await contract.mintToken("Ipfs uri");
  };

  console.log(id);
  return (
    <div>
      <div style={{ width: "1100px" }}>
        <Player
          title="Agent 327: Operation Barbershop"
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
            <div style={{ marginLeft: "10px" }}>Name</div>
          </div>

          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline btn-success">
                Become a Member
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "60px" }}>description</div>
      </div>
    </div>
  );
}
