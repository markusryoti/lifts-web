export const parseDate = (date: string): string => {
  const obj = new Date(date);
  return `${obj.getDate()}-${obj.getMonth()}-${obj.getFullYear()}`;
};
