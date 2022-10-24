import { RouteConfig } from 'react-router-config'
import Chat from '@/pages/Home'

const routesConfig: RouteConfig[] = [
  {
    path: '/home',
    exact: true,
    element: Chat,
  },
]

export default routesConfig
