import React from 'react'
import appRoute from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'

const App = () => {

  const route = createBrowserRouter(appRoute)

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={route} />
    </ThemeProvider>
    </>
  )
}

export default App