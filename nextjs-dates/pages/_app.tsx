import '../styles/globals.css'
import type { AppProps } from 'next/app'

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
