export type Token = {
    ticker: string;
    img: string;
    name: string;
    address: string;
    decimals: number;
};


export type Network = {
    network: string;
    chainId: number;
    img: string;
    loopsoContractAddress: string
};