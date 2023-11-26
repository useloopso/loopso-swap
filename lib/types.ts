export type Token = {
    ticker: string;
    img: string;
    name: string;
    address: string;
    decimals: number;
    isNative: boolean
};


export type Network = {
    network: string;
    chainId: number;
    img: string;
    loopsoContractAddress: string
};