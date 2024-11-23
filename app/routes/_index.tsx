import { Button, Flex, Text } from '@radix-ui/themes';

import { Header } from '~/components/Header';

export default function Page() {
  return (
    <>
      <Header />

      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let&#39;s go</Button>
      </Flex>

      <div style={{ height: 4096 }}>&nbsp;</div>
    </>
  );
}
