export function getExplorerAddress(chainId: number | undefined, address: string) {
    switch (chainId) {
        case 4201: // Lukso Testnet
            return `https://explorer.execution.testnet.lukso.network/address/${address}`;
        case 5: // Goerli Testnet
            return `https://goerli.etherscan.io/address/${address}`;
        case 11155111: // Sepolia Testnet
            return `https://sepolia.etherscan.io/address/${address}`;
        case 80001: // Mumbai Testnet
            return `https://mumbai.polygonscan.com/address/${address}`;
        default:
            return '';
    }
}