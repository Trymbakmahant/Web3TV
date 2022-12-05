//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import {ByteHasher} from "./ByteHasher.sol";
import {IWorldID} from "./IWorldID.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Youtube is ERC721URIStorage{

    event UserVerified(address indexed signal);

    struct Content{
        string name;
        string description;
        string playbackID;
        address creator;
    }

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();
    
    using ByteHasher for bytes;

    address public owner;

    // The worldID instance
    IWorldID public immutable worldId;

    //Addresses that are verified
    mapping(address => bool) public isVerified;

    // WorldCoin group Id (always 1)
    uint256 public constant groupId = 1;

    string public actionId = "wid_staging_719d782ac38be75a36cbba66c90828e4";

    // /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) public nullifierHashes;
    
    uint public tokenId = 1;

    mapping(address => Content[]) public contents;

    //Mapping to get the subscribed channels of an address
    mapping(address => address[]) public subscribed;

    //For testing purpose only -> returns the total amount of subscribers
    mapping(address => uint) public subscribers;

    //mapping to get the subscribers of particular channel
    mapping(address => address[]) public subs;

    //mapping of tokenId with reviseId
    mapping(uint256 => string) public reviseId;

    //mapping of address that subscribed to push channel
    mapping(address => bool) public push;

    mapping(address => string[]) public updateRevision;

    Content[] public contentArray;

    constructor(address  _worldID) ERC721("SUPPORTER", "SUP"){
        worldId =  IWorldID(_worldID);
        owner = msg.sender;
    }

    //Function to mint an ERC721 dynamic token using revise 
    function mintToken(string memory _tokenURI) external{
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenId += 1;
    
    }

    function setReviseId(address creator, uint256 _tokenId, string calldata _reviseId) external{
        reviseId[_tokenId] = _reviseId;
        updateRevision[creator].push(_reviseId);
    }

    //This function adds new content url to the subscriber's account
    function newContent(string calldata _name, string calldata _description, string calldata _playback, address _creator) external{
        Content memory _newContent =  Content({name:_name, description: _description, playbackID: _playback, creator: _creator});
        contents[msg.sender].push(_newContent);
        contentArray.push(_newContent);
    }

    //Adding msg.sender as a subscriber of a given user
    function addSubscription(address _subscriberAddress) external payable{
        if(subs[_subscriberAddress].length <= 100){
            require(msg.value >= 0.001 ether, "Amount is not correct");
        }else if(subs[_subscriberAddress].length <= 10000 && subs[_subscriberAddress].length > 100){
            require(msg.value >= 0.01 ether, "Amount is not correct");
        }
        subscribed[msg.sender].push(_subscriberAddress);
        subs[_subscriberAddress].push(msg.sender);
        subscribers[_subscriberAddress] += 1;
    }

    //@devs worldcoin on-chain verification
    function verifyAndExecute(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public{
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            abi.encodePacked(actionId).hashToField(),
            proof
        );

        nullifierHashes[nullifierHash] = true;

        isVerified[signal] = true;

        emit UserVerified(signal);
    }

    function showSubscribers(address _addr) external view returns(address[] memory){
        return subs[_addr];
    }

    function checkPush() external view returns(bool){
        return push[msg.sender];
    }

    function showContent() external view returns(Content[] memory){
        return contentArray;
    }

    function getCreatorContent(address _creator) external view returns(Content[] memory){
        return contents[_creator];
    }
    
    fallback() external payable{}
    receive() external payable{}
}