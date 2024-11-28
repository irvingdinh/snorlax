import { Container, Text } from '@mantine/core';
import { MetaFunction } from '@remix-run/node';

import { Header } from '~/components/Header';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Irving Dinh — Software engineer, designer, and amateur photographer.',
    },
    {
      property: 'og:title',
      content: 'Irving Dinh',
    },
    {
      name: 'description',
      content: 'Software engineer, designer, and amateur photographer.',
    },
  ];
};

export default function Page() {
  return (
    <>
      <Header />

      <Container mt="lg">
        <Text>Coming soon!</Text>
      </Container>
    </>
  );
}
