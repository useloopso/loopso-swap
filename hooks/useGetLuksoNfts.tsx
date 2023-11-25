import { NftMetadata, fetchLuksoNfts } from 'loopso-bridge-sdk';
import { useEffect, useState } from 'react';



const useGetLuksoNfts = (searchText: string) => {
  const [nfts, setNfts] = useState<NftMetadata[] | null>(null);
  const [loadingNfts, setLoadingNfts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        if(!nfts && searchText && !loadingNfts){
            setLoadingNfts(true)
            const _nfts = await fetchLuksoNfts(searchText)
            setNfts(_nfts)
            setLoadingNfts(false)
        }
        else if(!searchText && nfts){
            setNfts(null)
        }
    };

    fetchData();
  }, [nfts, searchText, loadingNfts]);

  return { nfts, loadingNfts } ;
};

export default useGetLuksoNfts;
