import { MetaFunction } from '@remix-run/node';
import clsx from 'clsx';

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

      <Hero className="my-24" />
    </div>
  );
}

const Hero = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <div className={className} {...otherProps}>
      <Container>
        <div className="max-w-3xl mx-auto lg:mx-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight sm:leading-tight lg:leading-tight text-center lg:text-left">
            Software engineer, designer, and amateur photographer.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto lg:mx-0 mt-6">
          <h3
            className={clsx(
              'text-gray-600 font-light text-lg lg:text-xl text-center lg:text-left',
              'dark:text-gray-300',
            )}
          >
            I’m Irving, a software engineer and designer based in Ho Chi Minh
            City. Beside the full-time job at Axon, I’m also the co-founder of a
            small studio, where we develop apps that help regular people to
            enjoy the technology on their own terms.
          </h3>
        </div>
      </Container>

      <Photos />
    </div>
  );
};

function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[
          'featured-1.jpeg',
          'featured-2.jpeg',
          'featured-3.jpeg',
          'featured-4.jpeg',
          'featured-5.jpeg',
        ].map((image, imageIndex) => (
          <div
            key={image}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <img
              src={`/images/${image}`}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
