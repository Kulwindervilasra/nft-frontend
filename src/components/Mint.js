//src/components/Mint.js
import React, { useState } from 'react';
import axios from 'axios';
import { Toast, Spinner } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const MintToken = ({ contract, fetchNFTs }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState(''); // 'success' or 'danger'

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
        } else {
            setToastMessage('Please upload a valid image file.');
            setToastVariant('danger');
            setShowToast(true);
            event.target.value = null; // Clear the file input
        }
    };

    const mintNFT = async () => {
        if (!name || !description || !imageFile) {
            setToastMessage('Please fill out all fields and select an image.');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }

        try {
            setLoading(true);

            // Upload image to IPFS
            const formData = new FormData();
            formData.append('file', imageFile);

            const fileUploadResponse = await axios.post(API_URL + '/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = fileUploadResponse.data.IpfsHash;

            // Create JSON metadata
            const metadata = {
                name,
                description,
                image: imageUrl,
            };

            // Upload JSON metadata to IPFS
            const jsonUploadResponse = await axios.post(API_URL + '/upload-json', metadata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const tokenURI = jsonUploadResponse.data.IpfsHash;

            // Mint the NFT using the tokenURI
            const tx = await contract.mintNFT(window.ethereum.selectedAddress, tokenURI);
            await tx.wait();

            setToastMessage('NFT Minted successfully!');
            setToastVariant('success');
            setShowToast(true);
            await fetchNFTs(contract)
        } catch (error) {
            console.error('Error minting NFT:', error);
            setToastMessage('Failed to mint NFT. Please try again.');
            setToastVariant('danger');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <h2>Mint New NFT</h2>
                <div className="form-group">
                    <label htmlFor="nftName">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nftName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nftDescription">Description</label>
                    <textarea
                        className="form-control"
                        id="nftDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nftImage">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="nftImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={loading}
                    />
                </div>
                <button
                    className="btn btn-primary mt-2"
                    onClick={mintNFT}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{' '}
                            Minting...
                        </>
                    ) : (
                        'Mint NFT'
                    )}
                </button>
            </div>

            {/* Toast for success/error messages */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 1000,
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">
                        {toastVariant === 'success' ? 'Success' : 'Error'}
                    </strong>
                </Toast.Header>
                <Toast.Body className={`text-${toastVariant}`}>
                    {toastMessage}
                </Toast.Body>
            </Toast>
        </>
    );
};

export default MintToken;
