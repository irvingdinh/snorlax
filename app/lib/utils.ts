export const makeTitle = (title: string = ''): string => {
  return title === ''
    ? 'Irving Dinh — Software engineer, designer, and amateur photographer'
    : `${title} — Irving Dinh`;
};
