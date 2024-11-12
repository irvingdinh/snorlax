import './tailwind.css';

import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { SingleLayout } from '~/components/SingleLayout';
import { makeTitle } from '~/lib/utils';

export const links: LinksFunction = () => [];

export const meta: MetaFunction = ({ error }) => {
  if (error) {
    return [
      {
        title: makeTitle('Oops'),
      },
    ];
  }

  return [];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full bg-zinc-50 dark:bg-black">
        <div className="flex w-full">
          <SingleLayout>{children}</SingleLayout>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Page not found
        </h1>

        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, I couldn’t find the page you’re looking for.
        </p>

        <Button to="/" variant="secondary" className="mt-4">
          Go back home
        </Button>
      </div>
    </Container>
  );
}
