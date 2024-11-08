import clsx from 'clsx';

export const Container = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      className={clsx('mx-auto max-w-7xl', 'px-2 xl:px-0', className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};
