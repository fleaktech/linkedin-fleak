export const req_bright_snapshot_id = async (url) => {
  const resp = await fetch(process.env.NEXT_PUBLIC_FLEAK_GET_SNAPSHOT_ID, {
    method: 'POST',
    headers: {
        'api-key': process.env.NEXT_PUBLIC_FLEAK_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      {
        "urls": [
          {
            "url": url
          }
        ]
      }
    ])
  })
  return await resp.json()
}

export const req_snapshot_is_ready = async (snapshot_id) => {
  const resp = await fetch(process.env.NEXT_PUBLIC_FLEAK_SNAPSHOT_STATUS, {
    method: 'POST',
    headers: {
        'api-key': process.env.NEXT_PUBLIC_FLEAK_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      {
        "snapshot_id": snapshot_id
      }
    ])
  })

  return await resp.json();
}

export const req_result = async (snapshot_id, job_url) => {
  const resp = await fetch(process.env.NEXT_PUBLIC_FLEAK_ENDPOINT, {
    method: 'POST',
    headers: {
        'api-key': process.env.NEXT_PUBLIC_FLEAK_API_KEY,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([
      {
        "snapshot_id": snapshot_id,
        "job_url": job_url
      }
    ])
  })
  return resp.json();
}