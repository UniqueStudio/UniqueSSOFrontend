import { FC } from 'react'
import { DashboardRounded as DashboardIcon } from '@mui/icons-material'
import { Avatar, Container, Paper, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Outlet } from 'react-router-dom'

const Auth: FC = () => {
  return (
    <Container maxWidth='xs'>
      <Paper
        elevation={12}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} alignItems='center'>
          <Avatar
            sx={{
              height: 64,
              width: 64,
              bgcolor: blue[50],
            }}
          >
            <DashboardIcon color='primary' fontSize='large' />
          </Avatar>
          <Stack spacing={1} alignItems='center'>
            <Typography variant='h5'>联创团队招新系统</Typography>
            <Typography variant='subtitle1'>Candidate Dashboard</Typography>
          </Stack>
        </Stack>
        <Outlet />
      </Paper>
    </Container>
  )
}

export default Auth
