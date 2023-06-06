import '@/shared/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "@/shared/store";
import Script from "next/script";

function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
        <Script strategy="beforeInteractive" src="https://unpkg.com/@green-api/whatsapp-api-client/lib/whatsapp-api-client.min.js" />
    </Provider>
}

export default MyApp
