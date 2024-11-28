import '@mantine/core/styles.css';
import './styles.css';

import {
  json,
  Outlet,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react';

import { RootErrorBoundary } from '~/components/templates/RootErrorBoundary';
import { RootLayout } from '~/components/templates/RootLayout';

export async function loader() {
  return json({
    env: {
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY || '',
      GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const routeLoaderData = useRouteLoaderData<typeof loader>('root');
  const routeError = useRouteError();
  if (routeError) {
    return <RootErrorBoundary />;
  }

  return <RootLayout loaderData={routeLoaderData!}>{children}</RootLayout>;
}

export default function App() {
  return <Outlet />;
}
