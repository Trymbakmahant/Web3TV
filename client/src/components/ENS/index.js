import {ethers} from "ethers";

(async function(){
    
    const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/RTRrA6H-niBMX-0b1uGNHyzAYVWBVPfq');

    // const provider = ctx.sharedState.contract.provider;

    const name = await provider.lookupAddress('0x61e919117115077f4CB6Bf1c2BC2931BEC8ea9C2');
    
    console.log('name is ',name);
    
    const avatar = await provider.getAvatar(name);
    
    console.log('avatar is ', avatar);
})();