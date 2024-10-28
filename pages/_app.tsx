import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from 'next/head';

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Shoppi-lens | Visual Product Search</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
