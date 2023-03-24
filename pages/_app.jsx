import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
