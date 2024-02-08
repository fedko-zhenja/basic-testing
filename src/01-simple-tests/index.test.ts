import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    const resSum = 2;
    expect(sum).toBe(resSum);
  });

  test('should subtract two numbers', () => {
    const diff = simpleCalculator({ a: 2, b: 1, action: Action.Subtract });
    const resDiff = 1;
    expect(diff).toBe(resDiff);
  });

  test('should multiply two numbers', () => {
    const mult = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    const resMult = 4;
    expect(mult).toBe(resMult);
  });

  test('should divide two numbers', () => {
    const div = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    const resDiv = 2;
    expect(div).toBe(resDiv);
  });

  test('should exponentiate two numbers', () => {
    const exp = simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate });
    const resExp = 4;
    expect(exp).toBe(resExp);
  });

  test('should return null for invalid action', () => {
    const invalidAction = simpleCalculator({
      a: 2,
      b: 2,
      action: 'invalid action',
    });
    expect(invalidAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArguments = simpleCalculator({
      a: 2,
      b: 'invalid arguments',
      action: Action.Exponentiate,
    });
    expect(invalidArguments).toBeNull();
  });
});
