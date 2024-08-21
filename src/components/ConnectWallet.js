// src/components/ConnectWallet.js
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';

const ConnectWallet = ({ onWalletConnected }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    const connectWallet = useCallback(async () => {
        if (window?.ethereum) {
            try {
                const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(address);
                setIsConnected(true);
                onWalletConnected(address);
                setError(null);  // Clear any previous errors
            } catch (error) {
                console.error('Error connecting wallet:', error);
                setError('Failed to connect wallet. Please try again.');
            }
        } else {
            setError('Please install MetaMask!');
        }
    }, [onWalletConnected]);

    const disconnectWallet = () => {
        setAccount(null);
        setIsConnected(false);
        setError(null);
        onWalletConnected(null);
    };

    useEffect(() => {
        connectWallet();
    }, [connectWallet]);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-10">
            <Card style={{ width: '40rem', padding: '5px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body className="text-center">
                    <div className="mb-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            fill="currentColor"
                            className="bi bi-wallet2"
                            viewBox="0 0 16 16"
                            style={{ color: '#6c757d' }}
                        >
                            <path d="M12 1a2 2 0 0 1 2 2v1H2V3a2 2 0 0 1 2-2h8zm2 4V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2h11zM2 5.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.5H2zm11 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                        </svg>
                    </div>
                    <Card.Title className="mb-1" style={{ fontSize: '1rem' }}>
                        {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
                    </Card.Title>
                    {isConnected ? (
                        <div>
                            <Alert variant="success" style={{ fontSize: '0.9rem' }}>
                                Connected: <strong>{account}</strong>
                            </Alert>
                            <Button
                                variant="danger"
                                onClick={disconnectWallet}
                                style={{ padding: '3px 8px', fontSize: '0.85rem', fontWeight: 'bold' }}
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={connectWallet}
                            style={{ padding: '3px 8px', fontSize: '0.85rem', fontWeight: 'bold' }}
                        >
                            Connect Wallet
                        </Button>
                    )}
                    {error && (
                        <Alert variant="danger" className="mt-2" style={{ fontSize: '0.85rem' }}>
                            {error}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ConnectWallet;
