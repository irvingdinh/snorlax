import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { GtagService } from '~/services/gtag.service';

type RootLayoutProps = {
  loaderData: {
    env: Record<string, string>;
  };
  children: React.ReactNode;
};

export const RootLayout = ({ loaderData, children }: RootLayoutProps) => {
  const location = useLocation();

  const gaTrackingId =
    typeof loaderData !== 'undefined' &&
    'env' in loaderData &&
    'GA_TRACKING_ID' in loaderData.env
      ? loaderData.env.GA_TRACKING_ID
      : '';

  const recaptchaSiteKey =
    typeof loaderData !== 'undefined' &&
    'env' in loaderData &&
    'RECAPTCHA_SITE_KEY' in loaderData.env
      ? loaderData.env.RECAPTCHA_SITE_KEY
      : '';

  useEffect(() => {
    if (gaTrackingId) {
      GtagService.pageView(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

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
        {gaTrackingId !== '' && <GoogleAnalyticsInjector id={gaTrackingId} />}

        <MantineProvider defaultColorScheme="auto">
          <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
            {children}
          </GoogleReCaptchaProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

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
