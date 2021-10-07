import "../styles/globals.css";
import type { AppProps } from "next/app";
import "firebase/compat/firestore";
import { FuegoProvider } from "@nandorojo/swr-firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

import { Fuego } from "../firebase/fuego";
const fuego = new Fuego(firebaseConfig);
import { getRemoteConfig, getValue } from "firebase/remote-config";

// FIXME: 
export async function getStaticProps(context) {
  const remoteConfig = getRemoteConfig();
  const appTitleVal = getValue(remoteConfig, "app_title");
  return {
    props: {
      appTitle: appTitleVal || "null",
    },
  };
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
    </FuegoProvider>
  );
}
export default MyApp;
