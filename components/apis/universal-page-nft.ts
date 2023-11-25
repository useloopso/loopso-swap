const API_BASE_URL = 'https://api.universal.page';

export const config = {
  runtime: 'edge',
};

const HEADERS = {
  'Content-Type': 'application/json',
};

const UniversalPageMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const UniversalPageService = {
  fetchLSPs: async (ipfsCid: string) => {
    const projectId = '8572d5e16fdd2b31872e9c40c19034e5';
    const url = `${API_BASE_URL}/${projectId}/ipfs/${ipfsCid}`;
    const options = {
      method: UniversalPageMethods.GET,
      headers: HEADERS,
    };

    const response = await fetch(url, options);


    if (response.status === 200) {
      const data = await response.json();

      const mappedData = {
        description: data?.LSP4Metadata?.description || '',
        images: data?.LSP4Metadata?.images?.flatMap((imageArray: any) =>
          imageArray.map((image: any) => ({
            url: image?.url || '',
          }))
        ) || [],
      };

      return mappedData;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },
};

export default UniversalPageService;
