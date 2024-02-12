import { mockOne, mockTwo, mockThree } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const funcMocks = {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };

  const mockResObj = {
    ...originalModule,
    ...funcMocks,
  };

  return mockResObj;
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    mockOne(), mockTwo(), mockThree();

    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    const { unmockedFunction } = jest.requireActual('./index');
    unmockedFunction();

    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
