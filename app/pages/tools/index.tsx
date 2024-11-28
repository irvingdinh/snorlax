import { Badge, Box, Card, Code, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import { Header } from '~/components/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'Tools — Irving Dinh' },
    {
      property: 'og:title',
      content: 'Tools — Irving Dinh',
    },
    {
      name: 'description',
      content: 'Free tools from Irving Dinh — your daily dose!',
    },
  ];
};

export default function Page() {
  return (
    <>
      <Header />

      <Container mt="lg">
        <Stack gap="lg">
          <Box>
            <Title order={2}>Tools</Title>

            <Text c="dimmed">
              Free tools from Irving Dinh — your daily dose!
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Link to="/tools/proofreading">
                  <Text c="blue" fw={500}>
                    Proofreading
                  </Text>
                </Link>

                <Badge>Featured</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                AI-powered proofreading assistant, I&#39;m using{' '}
                <Code>gemini-1.5-flash-8b</Code> under the hood!
              </Text>
            </Card>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}
