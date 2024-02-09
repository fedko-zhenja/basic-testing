import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 1, action: Action.Add, expected: 2 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 2, action: 'invalid action', expected: null },
  { a: 2, b: 'invalid arguments', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should check the operation of simpleCalculator',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
