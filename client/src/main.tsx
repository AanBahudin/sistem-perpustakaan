import React from 'react'
import { createRoot } from 'react-dom/client'
import {store} from './store/store.tsx'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider.tsx'
import { ToastContainer } from 'react-toastify'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ToastContainer  position='top-right' hideProgressBar={true} closeButton={false} />
          <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
)
