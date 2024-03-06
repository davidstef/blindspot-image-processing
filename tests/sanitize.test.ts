import { sanitizeResolution, sanitizeName } from '../src/utils/utils';

describe('sanitizeResolution', () => {
  test('should sanitize resolution correctly', () => {
    const input = '<p>300 x 400</p> some %$';
    const sanitized = sanitizeResolution(input);
    expect(sanitized).toEqual('300x400');
  });

  test('should handle various characters and spaces', () => {
    const input = '<p>## 300 x 401 C </p> $@ </div>';
    const sanitized = sanitizeResolution(input);
    expect(sanitized).toEqual('300x401');
  });
});

describe('sanitizeName', () => {
  test('should sanitize name correctly', () => {
    const input = '<div>some.name@some_thing</div>';
    const sanitized = sanitizeName(input);
    expect(sanitized).toEqual('<div>some.name@some_thing<div>');
  });

  test('should handle spaces and special characters', () => {
    const input = 'anything.   anything_#';
    const sanitized = sanitizeName(input);
    expect(sanitized).toEqual('anything.anything_#');
  });
});