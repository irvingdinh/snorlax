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
  useLocation,
} from '@remix-run/react';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { GtagService } from '~/core/services/gtag.service';

export async function loader() {
  return json({
    env: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || '',
      GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const loaderData = useLoaderData<typeof loader>();

  useEffect(() => {
    if (loaderData.env.GA_TRACKING_ID) {
      GtagService.pageView(location.pathname, loaderData.env.GA_TRACKING_ID);
    }
  }, [location, loaderData.env.GA_TRACKING_ID]);

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
        {loaderData.env.GA_TRACKING_ID !== '' && (
          <GoogleAnalyticsInjector id={loaderData.env.GA_TRACKING_ID} />
        )}

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

const GoogleAnalyticsInjector = ({ id }: { id: string }) => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />

      <script
        async
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${id}');
          `,
        }}
      />
    </>
  );
};
