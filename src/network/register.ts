/**
 * description: 注册
 * author: DanmoSAMA
 * date: 2022-10-26 17:20:28 +0800
 */

import { BACKENDHOST, Gender } from '@/configs'

export interface IRegister {
  name: string
  gender: Gender
  phone: string
  mail: string
  validate_code: string
  password: string
}

export async function register(data: IRegister) {
  const url = `${BACKENDHOST}/register`
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
