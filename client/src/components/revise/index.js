import {Revise} from "revise-sdk";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzMmY1ZDRlLWM2YTUtNGU4Yi04NTI3LWM2NzEzNGNiMTZiMSIsImtleSI6Imd3bWRxOWlrIiwiaWF0IjoxNjY5NzM1MDUxfQ.dQ_hhQATRIVKIYKFqKogs36dNPtYqLH3ojfh3jDBJy8";

const revise = new Revise({auth:AUTH_TOKEN});

const tokenId = "1";
async function createToken(){

    const tokenData = {
        
        "name": 'Subscriber',
        "image": 'https://gateway.pinata.cloud/ipfs/QmTmkUGyPg5d1qheYKRuh7UScGoH5TSsY8ueDNPHQ9a51R',
        "tokenId":tokenId,
        "description":"This is a simple image for testing purpose" 
    };

    const properties = [{hairColor: "white"}, {visibility:"legendary"}, {eyes: "covered"}]

    const newNFT = await revise.addNFT(tokenData, properties);
    console.log("new nft is ", newNFT);
}

async function fetchToken(){

    const result = await revise.fetchNFT('f1171828-e756-414e-a856-eb6757fdceb5')
    
    console.log("fetched Token is ", result);
}

async function change(){
    const nft = await revise.fetchNFT('f1171828-e756-414e-a856-eb6757fdceb5');
    const result = await revise.nft(nft).setProperty('eyes', "Blue").save();
    // console.log("result is ", result);
}

const main = async () => {
    // await createToken();
    await fetchToken();
    await change();
    await fetchToken();

}

main();

//nftID - f1171828-e756-414e-a856-eb6757fdceb5
//revisionId - 14e2f431-527a-41ab-b09a-ef91030fab21