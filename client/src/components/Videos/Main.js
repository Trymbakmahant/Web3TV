import { useState, useRef, useContext } from "react";
import * as PushAPI from "@pushprotocol/restapi";
import * as tus from "tus-js-client";
import {AppContext} from "../context/AddressContext";
import {ethers} from "ethers";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState('');

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const PK = '05c9162a926946c4fe7d3645742decff7853ee99f5dad08d0a7d5d95fd3afce7'; // channel private key //this is testnet keys anyways lmao
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  const ctx = useContext(AppContext);
  const accountAddress = ctx.sharedState.contract.accountAddress;
  const contract = ctx.sharedState.contract.contractData;

  const videoHandler = (event) =>{
    setVideo(event.target.files[0]);
  }

  const addData = async (nameRef, descriptionRef, videoUrl) => {
    console.log("add data");
    await ctx.sharedState.contract.contractData.newContent(nameRef.current.value, descriptionRef.current.value, videoUrl.substring(62), accountAddress);

    const addresses = await contract.showSubscribers(accountAddress);
    
    const recipients = addresses.map((address) => {
      return "eip155:80001:" + address;
    })

    try {
      // apiResponse?.status === 204, if sent successfully!
  const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 4, // subset
    identityType: 2, // direct payload
    notification: {
      title: `[SDK-TEST] notification TITLE:`,
      body: `[sdk-test] notification BODY`
    },
    payload: {
      title: `[sdk-test] payload title`,
      body: `sample msg body`,
      cta: '',
      img: ''
    },
    recipients: recipients, // recipients addresses
    channel: 'eip155:80001:0x20647bDDa1Ce065566d73e8D702EE3f7E37f63CC', // your channel address
    env: 'staging'
  });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse?.status);
    } catch (err) {
      console.error('Error: ', err);
    }
    setIsLoading(false);
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${"4402a176-ddeb-4ecc-bfd6-ea9be0466f11"}`,
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
      console.log("upload is", upload);

      addData(nameInputRef, descriptionInputRef, upload.url);

        
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
