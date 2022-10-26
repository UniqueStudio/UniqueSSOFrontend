/**
 * description: 注册组件
 * author: DanmoSAMA
 * date: 2022-10-26 20:43:21 +0800
 */

import { LoadingButton } from '@mui/lab'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Input, Select, Password } from '@/components/TextFields'
import { useCountdown } from '@/hooks/useCountdown'
import { GENDERS } from '@/configs'
import { validateCode, validateMail, validatePhone } from '@/utils'
import { getSMSCode } from '@/network/code'
import { IRegister, register } from '@/network/register'

const Register = () => {
  const [timeLeft, setTimeLeft] = useCountdown()
  const navigate = useNavigate()
  const {
    control,
    watch,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    setValue,
  } = useForm<IRegister>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      mail: '',
      validate_code: '',
      password: '',
    },
  })

  const getCode = async () => {
    setTimeLeft(60)
    await getSMSCode({ phone: watch('phone') })
  }

  const submit: SubmitHandler<IRegister> = async ({
    phone,
    password,
    name,
    validate_code,
    gender,
    mail,
  }) => {
    if (isSubmitting) {
      return
    }
    if (
      await register({
        phone,
        password,
        name,
        validate_code,
        gender,
        mail,
      })
    ) {
      navigate('./login')
    } else {
      setValue('validate_code', '')
    }
  }

  return (
    <Stack
      spacing={2}
      component='form'
      alignItems='center'
      width='75%'
      onSubmit={handleSubmit(submit)}
    >
      <Box display='grid' gridTemplateColumns='2fr 1fr' gap={1}>
        <Input name='name' control={control} label='姓名' />
        <Select
          name='gender'
          control={control}
          selections={GENDERS.map((value, key) => ({ key, value }))}
          label='性别'
        />
      </Box>
      <Input
        name='mail'
        control={control}
        rules={{ validate: validateMail }}
        label='邮箱'
        type='email'
        fullWidth
      />
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
      <Password name='password' control={control} label='密码' fullWidth />
      <LoadingButton
        variant='contained'
        type='submit'
        disabled={!isValid}
        loading={isSubmitting}
      >
        注册
      </LoadingButton>
      <Typography variant='caption' color='textSecondary'>
        已有账号？ 立即
        <Link component={RouterLink} to='../login'>
          登录
        </Link>
      </Typography>
    </Stack>
  )
}

export default Register
