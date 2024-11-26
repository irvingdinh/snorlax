import '@mantine/core/styles.css';
import './styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export async function loader() {
  return json({
    env: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY as string,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <GoogleReCaptchaProvider
            reCaptchaKey={loaderData.env.RECAPTCHA_SITE_KEY}
          >
            {children}
          </GoogleReCaptchaProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
