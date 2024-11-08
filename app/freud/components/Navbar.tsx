import clsx from 'clsx';

import { Container } from '~/freud/components/Container';
import { NavbarThemeSwitcher } from '~/freud/components/NavbarThemeSwitcher';

export const Navbar = () => {
  return (
    <div
      className={clsx(
        'flex items-center h-16 bg-brown-100',
        'dark:bg-brown-950',
      )}
    >
      <Container className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-xl">Irving Dinh</p>
          </div>

          <div className="flex justify-end items-center gap-4">
            <NavbarThemeSwitcher />
          </div>
        </div>
      </Container>
    </div>
  );
};
