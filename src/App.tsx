import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import MainLayout from '@/layouts/MainLayout'
import './App.scss'

function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  )
}

export default App
