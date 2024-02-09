import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const funcCallResult = resolveValue(123);
    await expect(funcCallResult).resolves.toBe(123);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const funcCallResult = () => throwError('An error occurred');
    expect(funcCallResult).toThrowError('An error occurred');
  });

  test('should throw error with default message if message is not provided', () => {
    const funcCallResult = () => throwError();
    expect(funcCallResult).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const funcCallResult = () => throwCustomError();
    expect(funcCallResult).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const funcCallResult = () => rejectCustomError();
    await expect(funcCallResult).rejects.toThrow(MyAwesomeError);
  });
});
