import { useEffect, useState, useContext } from "react";
import Card from "../card/card";
import Sidebar from "../sidebar/Sidebar";
import { AppContext } from "../context/AddressContext";

 const Logo = "/logo512.png";

function Home() {
  const [videos, setVideos] = useState([]);
  const ctx = useContext(AppContext);
  const contract = ctx.sharedState.contract.contractData;

  useEffect(() => {
    
    if(contract !== null){

      (async function(){
        const allVideos = await contract.showContent();
        setVideos(allVideos);
      })()
    
    }
  }, [contract]);

  return (
    <div>
      <Sidebar />
      { videos.length > 0 && 
      <div style = {{display: "inline-block", marginLeft: "7%"}}>
      {videos.map((video, index) => {
        return <Card
          key={index}
          name={video.name}
          description={video.description}
          thumbnail={Logo}
          id={video.playbackID}
          creator={video.creator}
        />
      })
      }
      </div>
    }
    </div>
  );
}

export default Home;
