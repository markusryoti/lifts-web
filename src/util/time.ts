export const parseDate = (date: string): string => {
  const obj = new Date(date);
  return `${obj.getDate()}-${obj.getMonth()}-${obj.getFullYear()}, ${obj.getHours()}:${obj.getMinutes()}`;
};

export const getCurrentDate = (): string => {
  const obj = new Date();
  return `${obj.getDate()}-${obj.getMonth()}-${obj.getFullYear()}, ${obj.toLocaleTimeString()}`;
};
