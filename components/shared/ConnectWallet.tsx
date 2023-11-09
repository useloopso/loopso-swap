import React, { useState } from 'react';
import useWeb3Onboard from '@/components/web3-onboard';
import { Button } from '../ui/button';
import { Wallet } from 'lucide-react';

interface WalletState {
  label: string;
}

function ConnectWallet() {
  const [connectedWallet, setConnectedWallet] = useState<WalletState | null>(null);
  const { setupWeb3Onboard, disconnect, setChainId } = useWeb3Onboard();

  const handleConnect = async () => {
    const wallet = await setupWeb3Onboard();
    setConnectedWallet(wallet);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setConnectedWallet(null);
  };

//   const handleChangeChain = async (chainId: string) => {
//     await setChainId(chainId);
//   };

  return (
    <div>
      {connectedWallet ? (
        <div className='flex gap-4 justify-center text-center'>
            {/* <p className='font-semibold  pt-2 text-xs flex gap-2'>
                <Wallet className='w-6 h-6 text-[#000000]'/>
                <span className='text-[#000000] uppercase pt-1'>{connectedWallet.label}</span>
            </p> */}
          <Button onClick={handleDisconnect} className='w-32'>Disconnect</Button>
          {/* <Button onClick={() => handleChangeChain('1')}>Switch to Mainnet</Button>
          <Button onClick={() => handleChangeChain('2')}>Switch to Testnet</Button> */}
        </div>
      ) : (
        <Button onClick={handleConnect} className='w-32'>Connect Wallet</Button>
      )}
    </div>
  );
}

export default ConnectWallet;
