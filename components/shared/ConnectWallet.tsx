

import React, { useEffect, useState } from 'react';
import useWeb3Onboard from '@/components/web3-onboard';
import { Button } from '../ui/button';
import { useWallets } from '@web3-onboard/react';

interface WalletState {
  label: string;
}

function ConnectWallet() {
  const [connectedWallet, setConnectedWallet] = useState<WalletState | null>(null);
  const { connectWallet, disconnectWallet } = useWeb3Onboard();
  const connectedWallets = useWallets()

  useEffect(() => {
    if (connectedWallets.length) {
      setConnectedWallet(connectedWallets[0]);
    }
  }, [connectedWallets]);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    setConnectedWallet(wallet);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setConnectedWallet(null);
  };

  return (
    <div>
      {connectedWallet ? (
        <div className='flex gap-4 justify-center text-center'>
          <Button onClick={handleDisconnect} className='w-32'>Disconnect</Button>
        </div>
      ) : (
        <Button onClick={handleConnect} className='w-32'>Connect Wallet</Button>
      )}
    </div>
  );
}

export default ConnectWallet;
