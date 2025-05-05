import { createRoot } from 'react-dom/client'
import {store} from './store/store.tsx'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from 'sonner'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster position='top-right' />
          <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
)
