import { MetaFunction } from '@remix-run/node';

import { Hero } from '~/core/components/Hero';
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

      <Hero className="my-24" />
    </div>
  );
}
