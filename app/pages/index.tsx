import { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

import { Container } from '~/components/Container';
import { GitHubIcon, LinkedInIcon } from '~/components/SocialIcons';

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
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software engineer, designer, and amateur photographer.
          </h1>

          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Irving, a software engineer and designer based in Ho Chi Minh
            City. Beside the full-time job at Axon, I’m also the co-founder of a
            small studio, where we develop apps that help regular people to
            enjoy the technology on their own terms.
          </p>

          <div className="mt-6 flex gap-6">
            <SocialLink
              to="https://github.com/irvingdinh"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
              target="_blank"
            />

            <SocialLink
              to="https://linkedin.com/in/irvingdinh"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
            />
          </div>
        </div>
      </Container>

      <Photos />
    </>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

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
