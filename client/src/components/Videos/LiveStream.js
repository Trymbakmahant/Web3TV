import axios from "axios";
import { useState, useRef } from "react";
function LiveStreaming() {
  const [name, setName] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [flag, setFlag] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);

    console.log("value is:", event.target.value);
  };
  async function LiveStream() {
    const data = {
      name: name,
      record: flag,
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 0,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 0,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 0,
          width: 640,
          height: 360,
        },
      ],
    };
    try {
      const ans = await axios.post("https://livepeer.studio/api/stream", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${"b315777b-a6d4-4213-baf3-2d842d06dcb5"}`,
        },
      });
      setStreamKey(ans.data.streamKey);
      console.log(ans.data.streamKey);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {" "}
      <div className="center" style={{ margin: "15% 32%" }}>
        <div>
          <input
            className="input w-full max-w-xs"
            id={"my-input"}
            type={"text"}
            value={name}
            placeholder={"Type here"}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <label className="swap">
          <input type="checkbox" />
          <div className="swap-on">ON</div>
          <div className="swap-off">OFF</div>
        </label>
        <button
          className="btn btn-ghost"
          onClick={LiveStream}
          style={{ width: "200px" }}
        >
          Generate Stream Key
        </button>
        <div>
          <h1>{streamKey}</h1>
        </div>
      </div>
    </>
  );
}

export default LiveStreaming;
