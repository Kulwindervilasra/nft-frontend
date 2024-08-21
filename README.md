
# NFT DApp - Decentralized Application for Minting and Managing NFTs [DEMO](https://nft-frontend-kz4y.onrender.com/)

## Overview

This DApp allows users to mint, view, and transfer NFTs (Non-Fungible Tokens) using an ERC-721 smart contract on the Ethereum blockchain. Users can connect their Ethereum wallet (e.g., MetaMask) and interact with the blockchain directly from the web interface. The DApp provides a smooth user experience for managing digital assets and showcases the power of decentralized technology.

## Technologies Used

- **Front-End**: React.js, Bootstrap, Ethers.js (for blockchain interaction)
- **Smart Contract**: Solidity (ERC-721 standard)
- **Blockchain**: Ethereum testnet (e.g., sepolia)
- **Wallet Integration**: MetaMask
- **Hosting**: Vercel/Netlify or any cloud platform

## Application Architecture

- **React Frontend**: The React app provides a user interface for connecting a wallet, minting new NFTs, viewing owned NFTs, and transferring NFTs.
- **Ethers.js**: Used for interacting with the Ethereum blockchain, including reading and writing to the smart contract.
- **Solidity Smart Contract**: The backend logic for minting, transferring, and querying NFTs. Deployed on the Ethereum testnet.
  
### Assumptions & Decisions

- The application assumes the user has MetaMask installed and is connected to an Ethereum testnet.
- For simplicity, we used a minimalistic UI with Bootstrap.
- The DApp does not handle mainnet deployments and uses testnets for cost-free interactions.

## Prerequisites

- **Node.js** and **npm** installed.
- **MetaMask** browser extension installed and connected to an Ethereum testnet (e.g., Sepolia).
- Smart contract deployed on the Ethereum testnet (if you're deploying your own contract).

## Setup and Running the Application Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Kulwindervilasra/nft-frontend.git
   cd nft-dapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of your project and add the following variables:

   ```bash
REACT_APP_CONTRACT=0x96D55ca348bEFD0BD4869b10476b1ACc7a4AbBAa
REACT_APP_PINATA_BASE=https://yellow-defiant-leopard-8.mypinata.cloud/ipfs/
REACT_APP_OWNER=0xD2c7390f2CBB54c563D4442F97501f47C5839AAe
REACT_APP_API_URL=http://localhost:4000/api
   ```

   You can obtain an Infura Project ID by signing up at [Infura](https://infura.io/).

4. **Run the Application**

   ```bash
   npm start
   ```

   This will start the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Smart Contract Deployment

1. **Install Hardhat**

   ```bash
   npm install --save-dev hardhat
   ```

2. **Compile and Deploy**

   - Create a `contracts` folder and add your ERC-721 contract (e.g., `AdvancedNFT.sol`).
   - Configure your deployment script in `scripts/deploy.js`.
   - Run the deployment script to deploy your contract to a testnet:

     ```bash
     npx hardhat run scripts/deploy.js --network sepolia
     ```

   - After deployment, update the `REACT_APP_CONTRACT` in your `.env` file.

## Interacting with the Smart Contract

The DApp allows users to perform the following actions:

1. **Connect Wallet**: Users can connect their MetaMask wallet to the DApp.
2. **Mint NFT**: Users can mint a new NFT by providing the token URI (which could include metadata such as name, image, and description).
3. **View Owned NFTs**: The DApp displays a gallery of NFTs owned by the connected wallet.
4. **Transfer NFTs**: Users can transfer their NFTs to other Ethereum addresses.

## Additional Notes

- Ensure that your MetaMask is connected to the appropriate Ethereum testnet (e.g., sepolia) to interact with the smart contract.
- You can view the deployed contract on [Etherscan sepolia](https://sepolia.etherscan.io/).
- Always test your application thoroughly on the testnet before considering any mainnet deployment.

## License

This project is open-source and available under the [MIT License](LICENSE).
