import type { NextRequest } from 'next/server'

const projectId = '8572d5e16fdd2b31872e9c40c19034e5'

export const config = {
  runtime: 'brave' || 'chrome' || 'edge',
}

const UniversalPageService = async (req: NextRequest) => {
  // require only get requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'unsupported method' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // resolve path or cid requested. Function is src/pages/api/ipfs/[...path].ts
  // e.g. /api/ipfs/QmNeJgUiSgAVAUSeuYJvABXLdAN9Q6HE2fqLLXBtncHFyf
  const url = new URL(req.url)
  const pathOrCid = url.pathname.replace('/api/ipfs/', '')

  // proxy to IPFS gateway and return redirect
  return fetch(`https://api.universal.page/${projectId}/ipfs/${pathOrCid}`, {

    redirect: 'manual',
  })
}

export default UniversalPageService
