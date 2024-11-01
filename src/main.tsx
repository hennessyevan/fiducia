import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'
import { Toaster } from 'sonner'
import './db/migrations'

import './app/global.css'
import 'temporal-polyfill/global'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
