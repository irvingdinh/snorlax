import { MetaFunction } from '@remix-run/node';

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
    <div className="px-4 py-2">
      <p>Lorem ipsum dolor sit amet</p>
    </div>
  );
}
