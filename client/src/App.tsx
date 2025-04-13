import React from 'react'
import appRoute from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {

  const route = createBrowserRouter(appRoute)

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App