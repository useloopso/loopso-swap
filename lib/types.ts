export type Token = {
    ticker: string;
    img: string;
    name: string;
    address: string;
    decimals: number;
    isNative: boolean
};

export type NativeToken = {
    balance: string;
    decimals: number;
    name: string;
    symbol: string;
    token_address: string;
    image: string;
}

export type ERC20Token = {
    balance: string;
    decimals: number;
    name: string;
    symbol: string;
    token_address: string;
    image: string;
}

export type Network = {
    network: string;
    chainId: number;
    img: string;
    loopsoContractAddress: string
};