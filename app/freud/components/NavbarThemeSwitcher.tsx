import { useEffect, useState } from 'react';

import { ComputerIcon, MoonIcon, SunIcon } from '~/freud/components/Icon';
import { NavbarActionButton } from '~/freud/components/NavbarActionButton';

const STORAGE_KEY = 'prefers-color-scheme';

export const NavbarThemeSwitcher = () => {
  const [selectorIsDark, setSelectorIsDark] = useState<boolean>(false);
  const [userIsDark, setUserIsDark] = useState<boolean | null>(null);

  const isDark = userIsDark === null ? selectorIsDark : userIsDark;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSelectorIsDark(mediaQuery.matches);

    const eventListener = () => setSelectorIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', eventListener);

    return () => mediaQuery.removeEventListener('change', eventListener);
  }, []);

  useEffect(() => {
    const result = window.localStorage.getItem(STORAGE_KEY);
    if (result === 'dark') {
      setUserIsDark(true);
    } else if (result === 'light') {
      setUserIsDark(false);
    }
  }, []);

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleUserIsDark = () => {
    if (userIsDark === null) {
      setUserIsDark(true);
      window.localStorage.setItem(STORAGE_KEY, 'dark');
    } else if (userIsDark) {
      setUserIsDark(false);
      window.localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      setUserIsDark(null);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <NavbarActionButton onClick={toggleUserIsDark}>
      {userIsDark === null && <ComputerIcon />}
      {userIsDark === true && <MoonIcon />}
      {userIsDark === false && <SunIcon />}
    </NavbarActionButton>
  );
};
