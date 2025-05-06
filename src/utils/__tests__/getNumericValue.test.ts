import { getNumericValue } from '../getNumericValue';

describe('getNumericValue', () => {
  it('should return the numeric value as a string if styleValue is a valid number', () => {
    const result = getNumericValue('42', '10');
    expect(result).toBe('42');
  });

  it('should return the default value if styleValue is undefined', () => {
    const result = getNumericValue(undefined, '10');
    expect(result).toBe('10');
  });

  it('should return the default value if styleValue is not a valid number', () => {
    const result = getNumericValue('invalid', '10');
    expect(result).toBe('10');
  });

  it('should return the numeric value as a string even with leading zeros', () => {
    const result = getNumericValue('0042', '10');
    expect(result).toBe('42');
  });
});
