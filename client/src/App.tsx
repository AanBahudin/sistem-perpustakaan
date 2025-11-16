import React from 'react'
import mainRoute from '@/routes/mainRoute'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App : React.FC = () => {
  const route = createBrowserRouter(mainRoute)
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App