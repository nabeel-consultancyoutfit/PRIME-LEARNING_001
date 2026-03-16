import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { DocumentHeadTags } from '@mui/material-nextjs/v13-pagesRouter';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#2563EB" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <DocumentHeadTags />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
