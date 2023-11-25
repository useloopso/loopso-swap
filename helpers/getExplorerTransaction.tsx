export function getExplorerTransaction(chainId: number | undefined, txHash: string) {
    switch (chainId) {
        case 4201: // Lukso Testnet
            return `https://explorer.execution.testnet.lukso.network/tx/${txHash}`;
        case 5: // Goerli Testnet
            return `https://goerli.etherscan.io/tx/${txHash}`;
        case 11155111: // Sepolia Testnet
            return `https://sepolia.etherscan.io/tx/${txHash}`;
        case 80001: // Mumbai Testnet
            return `https://mumbai.polygonscan.com/tx/${txHash}`;
        default:
            return '';
    }
}