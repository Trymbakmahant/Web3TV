import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AddressContext";
import * as PushAPI from "@pushprotocol/restapi";
import { NotificationItem } from "@pushprotocol/uiweb";
import axios from "axios";
import { contractAddress } from "../constants";
import { ethers } from "ethers";

const Notification = () => {
    const [isSubscribed, setiSubscribed] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const ctx = useContext(AppContext);
    const accountAddress = ctx.sharedState.contract.accountAddress;
    const contract = ctx.sharedState.contract.contractData;

    useEffect(() => {
        
        (async function(){
            const addresses = await contract.showSubscribers(accountAddress);
    
            const recipients = addresses.map((address) => {
              return "eip155:80001:" + address;
            })

            console.log(recipients);
            const http = axios.create({
                baseURL: "https://api.starton.io/v3",
                headers: {
                    "x-api-key": 'sk_live_14d99f8a-52f0-43ce-be7f-5176563bac12',
                },
              })

            let isSubscribed;
            const response = await http.post(`/smart-contract/polygon-mumbai/${contractAddress}/read`, {
                functionName: 'checkPush',
                params: [],
            })
            console.log(response.data.response)
            isSubscribed = response.data.response;

                const notifi = await PushAPI.user.getFeeds({
                    user: `eip155:80001:${accountAddress}`, // user address in CAIP
                    env: 'staging'
                });
                setNotifications(notifi);
                console.log(notifi);
            setiSubscribed(isSubscribed);
        })();

    }, [accountAddress]);

    return <div>
        {notifications.length > 0 &&
            notifications.map((notification, index) => {
                return <NotificationItem key = {index} 
                notificationTitle = {notification.title} 
                notificationBody={notification.message}
                cta={notification.cta}
                app={notification.app}
                icon={notification.icon}
                image={notification.image}
                url={notification.url}
                theme={notification.theme}
                chainName={notification.blockchain}/>
            })
        }
    </div>
};

export default Notification;