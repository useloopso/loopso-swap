import React, { useState, useEffect } from 'react'
import CodeAnimation from './CodeAnimation'

const Code = () => {
    const sdkPackageCode = `npm install --save loopso-bridge-sdk`

    const sdkCode = `import { bridgeTokens, getFee } from 'loopso-bridge-sdk';
    
const _txHash = await bridgeTokens(
	contractAddressSrc,
	signer,
	srcChainId,
	amount,
	dstAddress,
	dstChain
);`

    const [show, setShow] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShow(prev => (prev < 2 ? prev + 1 : prev));
        });

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col gap-5 w-[600px] h-[300px] start-0'>
            <div className='relative group bg-[#3D426B] text-[13px] p-5 rounded-3xl'>
                <CodeAnimation code={sdkPackageCode} animated={true} show={show >= 1} />
            </div>
            <div className='relative group bg-[#3D426B] text-[13px] p-5 rounded-3xl'>
                <CodeAnimation code={sdkCode} animated={true} show={show >= 2} />
            </div>
        </div>
    );
}

export default Code;
