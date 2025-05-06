import { capitalizeFirstLetter } from '../capitalizeFirstLetter';

describe('capitalizeFirstLetter utility function', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should return the same string if the first letter is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('should handle an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});
