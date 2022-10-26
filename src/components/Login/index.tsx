/**
 * description: 登录组件
 * author: DanmoSAMA
 * date: 2022-10-26 20:43:21 +0800
 */

import { LoadingButton } from '@mui/lab'
import { Box, Button, Link, Stack, Typography, Tabs, Tab } from '@mui/material'
import { useState, SyntheticEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import { Input, Password } from '@/components/Textfields'
import { validatePhone, validateCode, validateMail } from '@/utils'
import { ILogin, login } from '@/network/login'
import { useCountdown } from '@/hooks/useCountdown'
import { getSMSCode } from '@/network/code'
import PropTypes from 'prop-types'

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

enum LoginMethod {
  PhoneWithPasswd,
  MailWithPasswd,
  PhoneWithCode,
  MailWithCode,
  Lark,
}

const Login = () => {
  const {
    control,
    watch,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      mail: '',
      password: '',
      validate_code: '',
    },
  })

  const [tabIndex, setTabIndex] = useState(LoginMethod.PhoneWithPasswd)
  const [timeLeft, setTimeLeft] = useCountdown()

  const getCode = async () => {
    setTimeLeft(60)
    if (tabIndex === LoginMethod.PhoneWithCode) {
      await getSMSCode({ phone: watch('phone') as string })
    } else if (tabIndex === LoginMethod.MailWithCode) {
      await getSMSCode({ phone: watch('mail') as string })
    }
  }

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setTabIndex(newValue)
  }

  const submit: SubmitHandler<ILogin> = async ({
    phone,
    mail,
    password,
    validate_code,
  }) => {
    if (isSubmitting) {
      return
    }
    switch (tabIndex) {
      case LoginMethod.PhoneWithPasswd:
        await login({ phone: phone, password: password })
        return
      case LoginMethod.MailWithPasswd:
        await login({ mail: mail, password: password })
        return
      case LoginMethod.PhoneWithCode:
        await login({ phone: phone, validate_code: validate_code })
        return
      case LoginMethod.MailWithCode:
        await login({ mail: phone, validate_code: validate_code })
        return
      default:
    }
  }

  return (
    <Stack
      spacing={2}
      component='form'
      alignItems='center'
      maxWidth='75%'
      onSubmit={handleSubmit(submit)}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            variant='scrollable'
            onChange={handleChange}
            aria-label='basic tabs example'
            sx={{ overflow: 'scroll' }}
          >
            <Tab label='手机+密码' />
            <Tab label='邮箱+密码' />
            <Tab label='手机验证码' />
            <Tab label='邮箱验证码' />
            <Tab label='飞书扫码' />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <Input
            name='phone'
            control={control}
            rules={{ validate: validatePhone }}
            label='手机号'
            type='tel'
            fullWidth
          />
          <Password name='password' control={control} label='密码' fullWidth />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Input
            name='mail'
            control={control}
            rules={{ validate: validateMail }}
            label='邮箱'
            type='email'
            fullWidth
          />
          <Password name='password' control={control} label='密码' fullWidth />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Input
            name='phone'
            control={control}
            rules={{ validate: validatePhone }}
            label='手机号'
            type='tel'
            fullWidth
          />
          <Box
            display='grid'
            gridTemplateColumns='2fr auto'
            gap={1}
            alignItems='center'
          >
            <Input
              name='validate_code'
              control={control}
              rules={{ validate: validateCode }}
              label='验证码'
            />
            <Button
              onClick={getCode}
              disabled={!!timeLeft || !watch('phone') || !!errors.phone}
            >
              {timeLeft ? `${timeLeft}秒后重新获取` : '获取验证码'}
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Input
            name='mail'
            control={control}
            rules={{ validate: validateMail }}
            label='邮箱'
            type='email'
            fullWidth
          />
          <Box
            display='grid'
            gridTemplateColumns='2fr auto'
            gap={1}
            alignItems='center'
          >
            <Input
              name='validate_code'
              control={control}
              rules={{ validate: validateCode }}
              label='验证码'
            />
            <Button
              onClick={getCode}
              disabled={!!timeLeft || !watch('phone') || !!errors.phone}
            >
              {timeLeft ? `${timeLeft}秒后重新获取` : '获取验证码'}
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          Todo...
        </TabPanel>
      </Box>
      <LoadingButton
        variant='contained'
        type='submit'
        disabled={!isValid}
        loading={isSubmitting}
      >
        登录
      </LoadingButton>
      <Stack alignItems='center'>
        <Typography variant='caption' color='textSecondary'>
          没有账号？ 立即
          <Link component={RouterLink} to='../register'>
            注册
          </Link>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Login
