//src/components/Gallary.js

import React, { useState } from 'react';
import TransferToken from './Transfer';

const BASE_URL = process.env.REACT_APP_PINATA_BASE || 'https://yellow-defiant-leopard-8.mypinata.cloud/ipfs/';

const NFTGallery = ({ nfts, contract, fetchNFTs }) => {
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedTokenId, setSelectedTokenId] = useState(null);



    const handleTransferClick = (tokenId) => {
        setSelectedTokenId(tokenId);
        setShowTransferModal(true);
    };

    const handleCloseTransferModal = () => {
        setShowTransferModal(false);
        setSelectedTokenId(null);
    };

    return (
        <div className="container mt-4">
            <h2>NFT Gallery</h2>
            <div className="row">
                {nfts.map(nft => (
                    <div className="col-md-3" key={nft.tokenId}>
                        <div className="card mb-4">
                            <img src={BASE_URL + nft.image} className="card-img-top" alt={nft.name} />
                            <div className="card-body">
                                <h5 className="card-title">{nft.name}</h5>
                                <h6 className="card-title">{nft.description}</h6>
                                <p className="card-text">Token ID: {nft.tokenId}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleTransferClick(nft.tokenId)}
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <TransferToken
                show={showTransferModal}
                handleClose={handleCloseTransferModal}
                contract={contract}
                fetchNFTs={fetchNFTs}
                tokenId={selectedTokenId}
            />
        </div>
    );
};

export default NFTGallery;
