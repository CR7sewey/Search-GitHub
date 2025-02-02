import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/toaster";
import client from './apolloClient.ts';
import { ApolloProvider } from '@apollo/client';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Toaster />
    </ApolloProvider>
  </StrictMode>,
)
