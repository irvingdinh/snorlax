import { MetaFunction } from '@remix-run/node';

import { Header } from '~/components/molecules/Header';
import { IndexHeroSection } from '~/components/organisms/IndexHeroSection';

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
      <IndexHeroSection />
    </>
  );
}
