//src/components/Transfer.js
import { isAddress } from 'ethers';
import React, { useState } from 'react';
import { Modal, Button, Toast, Spinner } from 'react-bootstrap';

const TransferToken = ({ show, handleClose, contract, tokenId, fetchNFTs }) => {
    const [toAddress, setToAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState(''); // 'success' or 'danger'

    const transferNFT = async () => {
        const isValid = isAddress(toAddress);
        if (!isValid) {
            setToastMessage('Please enter a valid address.');
            setToastVariant('danger');
            setShowToast(true);
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.safeTransferFrom(
                window.ethereum.selectedAddress,
                toAddress,
                tokenId
            );
            await tx.wait();
            setToastMessage('NFT Transferred!');
            setToastVariant('success');
            setShowToast(true);
            await fetchNFTs(contract)
            handleClose();
        } catch (error) {
            console.error('Error transferring NFT:', error);
            setToastMessage('Error transferring NFT. Please try again.');
            setToastVariant('danger');
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transfer NFT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="toAddress">To Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="toAddress"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={transferNFT} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{' '}
                                Transferring...
                            </>
                        ) : (
                            'Transfer'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

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

export default TransferToken;
