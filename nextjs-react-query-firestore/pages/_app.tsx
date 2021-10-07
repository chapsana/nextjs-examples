import "../styles/globals.css";
import type { AppProps } from "next/app";

import * as firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { ReactQueryFirestoreProvider } from "react-query-firestore";

const reactQueryConfig = {
  queries: {
    retry: false,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  <ReactQueryFirestoreProvider
    firestore={
      !firebase.apps.length
        ? firebase.initializeApp(config).firestore()
        : firebase.app().firestore()
    }
    reactQueryConfig={reactQueryConfig}
  >
    return <Component {...pageProps} />
  </ReactQueryFirestoreProvider>;
}
export default MyApp;
