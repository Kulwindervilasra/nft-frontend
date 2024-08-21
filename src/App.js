//src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import ConnectWallet from './components/ConnectWallet';
import NFTGallery from './components/Gallary';
import MintToken from './components/Mint';
import { ethers, getAddress } from 'ethers';
import contractABI from './abis/AdvancedNFT.json';
import axios from 'axios';


const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  const [isAdmin, setAdmin] = useState(false)

  const fetchNFTs = useCallback(async (nftContract) => {
    try {
      const response = await nftContract.tokensOfOwner(account);
      const nftList = [];
      for (const nft of response) {
        const tokenURI = await nftContract.tokenURI(nft);
        const nftInfo = await axios.get(tokenURI);
        nftList.push({ tokenId: Number(nft), ...nftInfo.data });
      }
      setNfts(nftList);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  }, [account]);


  const initializeContract = useCallback(async () => {
    if (account) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nftContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT,
        contractABI,
        await provider.getSigner()
      );

      const owner = await nftContract.owner()

      setAdmin(owner === getAddress(account))
      await fetchNFTs(nftContract)

      setContract(nftContract);
    }
  }, [account, fetchNFTs])

  useEffect(() => {
    initializeContract()

  }, [account, initializeContract]);



  return (
    <div className="container">
      <ConnectWallet onWalletConnected={(address) => setAccount(address)} />
      {account && contract && (
        <>
          {isAdmin && <MintToken fetchNFTs={fetchNFTs} contract={contract} />}

          <NFTGallery fetchNFTs={fetchNFTs} nfts={nfts} contract={contract} account={account} />
        </>
      )}
    </div>
  );
};

export default App;
