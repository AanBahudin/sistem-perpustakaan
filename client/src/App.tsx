import React from 'react'
import appRoute from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import {ToastContainer} from 'react-toastify'

const App = () => {

  const route = createBrowserRouter(appRoute)

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App