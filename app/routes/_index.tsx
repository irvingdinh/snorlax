import { MetaFunction } from '@remix-run/node';

import { Container } from '~/freud/components/Container';
import { Navbar } from '~/freud/components/Navbar';

export const meta: MetaFunction = () => {
  return [
    { title: 'Irving Dinh' },
    {
      name: 'description',
      content: 'Just another Software Engineer based in Ho Chi Minh, Viet Nam',
    },
  ];
};

export default function Page() {
  return (
    <div>
      <Navbar />

      <Container>
        <p>Lorem ipsum dolor sit amet</p>
      </Container>
    </div>
  );
}
