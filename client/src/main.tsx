import { createRoot } from 'react-dom/client'
import {store} from './store.ts'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster position='top-right' />
    <Provider store={store}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
      </ThemeProvider>
  </QueryClientProvider>
)
