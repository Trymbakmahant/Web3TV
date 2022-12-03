import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AddressContext";
import { ABI, contractAddress } from "../constants/index";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Navbar() {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const accountAddress = ctx.sharedState.contract.accountAddress;

  let contract;

  useEffect(() => {

    const http = axios.create({
      baseURL: "https://api.starton.io/v3",
      headers: {
        "x-api-key": 'sk_live_14d99f8a-52f0-43ce-be7f-5176563bac12',
      },
    })
    ctx.sharedState.setStarton(http);
    
  }, []);

  const connectFormHandler = async () => {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, ABI, signer);

    ctx.sharedState.setData(provider, signer, contract, accounts[0]);
  };

  const showNotificationsHandler = () => {
    navigate('/notifications');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            Creator
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                style={{ marginRight: "20px" }}
                exact
                className="nav-link btn-ghost"
                to="/UploadHOme"
              >
                Upload Video
              </Link>
            </li>

            <li>
              <Link
                style={{ marginRight: "20px" }}
                exact
                className="nav-link btn-ghost"
                to="/UploadHOme"
              >
                liveStream
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          style={{ marginRight: "20px" }}
          exact
          className="btn btn-ghost normal-case text-xl"
          to="/"
        >
          FreeSpeech
        </Link>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          style={{ marginRight: "20px", marginLeft: "20px" }}
        >
          <div className="indicator" onClick = {showNotificationsHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button
          onClick={connectFormHandler}
          style={{ marginRight: "20px", marginLeft: "20px" }}
          exact
          className=" btn btn-outline"
        >
          {accountAddress ? `${accountAddress.substr(0, 5)}...${accountAddress.substr(37,42)}` :"connect"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
