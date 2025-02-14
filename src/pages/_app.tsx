import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AI Sol Agent</title>
        <link rel="icon" href="/solana.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
