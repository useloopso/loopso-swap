const LuksoTokenService = {
    fetchLuksoTokens: async (address: string) => {
      try {
        const response = await fetch(`https://api.explorer.execution.testnet.lukso.network/api/v2/addresses/${address}/token-balances`);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
  
        console.log('Data:', data);
  
        return data;
      } catch (error) {
        console.error('Error fetching tokens:', error);
        throw error;
      }
    },
  };
  
  export default LuksoTokenService;
  