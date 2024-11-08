import clsx from 'clsx';

export const NavbarActionButton = (
  props: React.HTMLAttributes<HTMLButtonElement>,
) => {
  const { className, children, ...otherProps } = props;

  return (
    <button
      className={clsx(
        'flex justify-center items-center bg-brown-200 rounded-full text-brown-800 size-12',
        'dark:bg-brown-800 dark:text-white',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};
