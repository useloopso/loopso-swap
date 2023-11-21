import React, { useState, useEffect } from 'react'
import Code from './Code'

const CodeBlock = () => {
    const sdkPackageCode = `npm install --save loopso-bridge-sdk`

    const sdkCode = `import { fetchQuote, bridgeTokens } from 'loopso-bridge-sdk';
    
const _txHash = await bridgeTokens(
    selectedSourceChainNetwork.loopsoContractAddress,
    signer,
    await getContractAddressFromChainId(selectedSourceChainNetwork.chainId),
    BigInt(amount),
    wallet.accounts[0].address,
    selectedDestinationChainNetwork.chainId
);`

    const [show, setShow] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShow(prev => (prev < 2 ? prev + 1 : prev));
        });

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col gap-5 w-[700px] h-[300px] start-0'>
            <div className='relative group bg-[#3D426B] text-[13px] p-5 rounded-3xl'>
                <Code code={sdkPackageCode} animated={true} show={show >= 1} />
            </div>
            <div className='relative group bg-[#3D426B] text-[13px] p-5 rounded-3xl'>
                <Code code={sdkCode} animated={true} show={show >= 2} />
            </div>
        </div>
    );
}

export default CodeBlock;
