import { useState, useRef } from "react";
import * as tus from "tus-js-client";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [video, setVideo] = useState('');

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const thumbnailHandler = (event) =>{
    setThumbnail(event.target.files[0]);
  }

  const videoHandler = (event) =>{
    console.log(event.target.files[0]);
    setVideo(event.target.files[0]);
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let formData = new FormData();

    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LIVEPEER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "tusClient",
        }),
      }
    );
    
  const { tusEndpoint } = await response.json(); 
  
  const upload = new tus.Upload(video,{
    endpoint: tusEndpoint,
    metadata:{
      filename: "tusClient",
      filetype: "video/mp4"
    },
    uploadSize: video.size,
    onError(err) {
      console.error("Error uploading file:", err);
    },
    onProgress(bytesUploaded, bytesTotal) {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log("Uploaded " + percentage + "%");
    },
    onSuccess() {
      console.log("Upload finished:", upload.url);

        //upload to ipfs here -> both video and thumbnail
        // get cid of both here

        // const metadata = {
        //   address: creator address
        //   name: req.body.name,
        //   description: req.body.name,
        //   thumbnail: "thumbnail cid goes here",
        //   videoUrl: "video cid goes here"
        // }

        //upload metadata to ipfs 
        //get cid of metadata
        //send cid of metadata back as response
        setIsLoading(false);
        
    },
  });
  const previousUploads = await upload.findPreviousUploads();
  if (previousUploads.length > 0) {
    upload.resumeFromPreviousUpload(previousUploads[0]);
  }
  upload.start();
  }

  return (
    <div style={{ marginTop: "2%", marginBottom: "7%", marginLeft: "40%" }}>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
      >
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          placeholder="Name"
          ref={nameInputRef}
          required
        />
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          placeholder="Description"
          ref={descriptionInputRef}
          required
        />
        <label className="label">
          <span className="label-text">Thumbnail Image</span>
        </label>
        <input
          type="file"
          name="thumbnail"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          onChange={thumbnailHandler}
          required
        />
        <label className="label">
          <span className="label-text">Video</span>
        </label>
        <input
          type="file"
          name="videoUrl"
          id="videoUrl"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          onChange={videoHandler}
          required
        />
        <button
          type="submit"
          className={`btn btn-outline btn-success ${isLoading && "loading"}`}
          style={{ marginTop: "7%" }}
        >
           {isLoading ? "Uploading..." : "Upload"} 
        </button>
      </form>
    </div>
  );
}

export default Main;
