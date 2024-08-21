// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AdvancedNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for token IDs

    // Event to be emitted when a new NFT is minted
    event Minted(uint256 tokenId, address owner, string tokenURI);

    // Constructor, passing the token name and symbol to the ERC721 constructor
    constructor(address initialOwner) ERC721("AdvancedNFT", "ANFT") Ownable(initialOwner) {}

    // Function to mint a new NFT
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment(); // Increment the token counter
        uint256 newItemId = _tokenIds.current(); // Get the new token ID

        _mint(recipient, newItemId); // Mint the new token
        _setTokenURI(newItemId, tokenURI); // Set the token's URI (metadata link)

        emit Minted(newItemId, recipient, tokenURI); // Emit the Minted event

        return newItemId;
    }

    // Function to get all token IDs owned by a specific address
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);

        if (tokenCount == 0) {
            // If no tokens owned, return an empty array
            return new uint256[](0) ;    
             } 
            else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalTokens = _tokenIds.current();
            uint256 resultIndex = 0;

            for (uint256 tokenId = 1; tokenId <= totalTokens; tokenId++) {
                if (ownerOf(tokenId) == owner) {
                    result[resultIndex] = tokenId;
                    resultIndex++;
                }
            }

            return result;
        }
    }



    // Override _baseURI to define a base URI if necessary
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://yellow-defiant-leopard-8.mypinata.cloud/ipfs/";
    }
}
