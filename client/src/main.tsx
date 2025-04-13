import React from 'react'
import { createRoot } from 'react-dom/client'
import {store} from './store/store.tsx'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>,
  </QueryClientProvider>
)
