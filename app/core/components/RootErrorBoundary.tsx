import {
  Button,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Text,
  Title,
} from '@mantine/core';
import {
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './RootErrorBoundary.module.css';

export const RootErrorBoundary = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Oops — Irving Dinh</title>
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Container className={styles.root}>
            <div className={styles.label}>404</div>

            <Title className={styles.title}>
              You have found a secret place.
            </Title>

            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={styles.description}
            >
              Unfortunately, this is only a 404 page. You may have mistyped the
              address, or the page has been moved to another URL.
            </Text>

            <Group justify="center">
              <Link to="/">
                <Button variant="subtle" size="md">
                  Take me back to home page
                </Button>
              </Link>
            </Group>
          </Container>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
