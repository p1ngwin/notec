export const capitalize = (str: string): string => {
  if (str.length === 0) {
    return str;
  }

  const firstChar = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1).toLowerCase();

  return `${firstChar}${restOfString}`;
};
