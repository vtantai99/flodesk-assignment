export const getNumericValue = (styleValue: string | undefined, defaultValue: string) => {
  return styleValue ? parseInt(styleValue, 10).toString() : defaultValue;
};
