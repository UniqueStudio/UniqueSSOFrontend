/**
 * description: 登录
 * author: DanmoSAMA
 * date: 2022-10-26 17:20:28 +0800
 */

import { BACKENDHOST } from '@/configs'

export interface ILogin {
  phone?: string
  mail?: string
  password?: string
  validate_code?: string
}

export async function login(data: ILogin) {
  const url = `${BACKENDHOST}/login`
  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  } catch (err) {
    console.error(err)
  }
}
