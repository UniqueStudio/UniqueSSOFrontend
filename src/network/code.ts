/**
 * description: 获取验证码
 * author: DanmoSAMA
 * date: 2022-10-26 16:50:57 +0800
 */

import { BACKENDHOST } from '@/configs'

interface IGetSMSCode {
  phone: string
}

interface IGetEmailCode {
  email: string
}

export async function getSMSCode(data: IGetSMSCode): Promise<void> {
  const url = `${BACKENDHOST}/code/sms`
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.error(err)
  }
}

export async function getEMailCode(data: IGetEmailCode): Promise<void> {
  const url = `${BACKENDHOST}/code/email`
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.error(err)
  }
}
