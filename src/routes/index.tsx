import { createBrowserRouter } from 'react-router-dom'
import Auth from '@/pages/Auth'
import Login from '@/components/Login'
import Register from '@/components/Register'

// 该方法返回值类型是 RemixRouter，但是模块并未导出该类型
export const router: any = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
])
