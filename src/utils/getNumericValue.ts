export const getNumericValue = (styleValue: string | undefined, defaultValue: string): string => {
  const parsedValue = styleValue ? parseInt(styleValue, 10) : NaN;
  return isNaN(parsedValue) ? defaultValue : parsedValue.toString();
};