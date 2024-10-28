import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const _document = () => {
  return (
    <Html lang="en">
      <Head>
        <title>Scify</title>
        <link rel="icon" href="/images/logo.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
