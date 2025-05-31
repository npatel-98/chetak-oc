import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.url?.split('=')[1]

  try {
    const formdata = new FormData()
    formdata.append('grant_type', 'password')
    formdata.append('client_id', process.env.NEXT_PUBLIC_OC_CLIENT_ID)
    formdata.append('username', 'rvadher')
    formdata.append('password', 'Password@01')
    formdata.append('client_secret', 'MWBbUcTASRxxTs3ISNhGPdSzTWxrjGeQYKK7tl5AKhYRqfiwFLqalFcyHptF')
    const accessToken = await fetch('https://sandboxapi.ordercloud.io/oauth/token', {
      method: 'POST',
      body: formdata,
    })
    const myHeaders = new Headers()
    const accessTokenRes = await accessToken.json()
    myHeaders.append('Authorization', `Bearer ${accessTokenRes.access_token}`)
    const orders = await fetch(
      `https://sandboxapi.ordercloud.io/v1/orders/All?sortBy=!DateCreated&xp.email=${email}`,
      {
        method: 'GET',
        headers: myHeaders,
      }
    )
    const orderRes = await orders.json()

    // Get worksheets for all orders
    const worksheetPromises = orderRes?.Items?.map(async (order) => {
      const worksheet = await fetch(
        `https://sandboxapi.ordercloud.io/v1/orders/Outgoing/${order.ID}/worksheet`,
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
      return worksheet.json()
    })

    const worksheets = await Promise.all(worksheetPromises)
    console.log('@@worksheets', worksheets)
    return res.status(200).json(worksheets)
  } catch (error) {
    console.error('Error retrieving orders:', error)
    return res.status(500).json({
      message: 'Error retrieving orders',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}
