import { Box } from '@mui/material'
import React, { FC } from 'react'
import background from '/assets/imgs/background.png'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: FC = ({ children }: MainLayoutProps) => {
  return (
    <Box
      sx={{
        background: `url(${background})`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default MainLayout
