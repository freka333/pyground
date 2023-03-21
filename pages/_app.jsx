import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </SessionContextProvider>
  )
}
