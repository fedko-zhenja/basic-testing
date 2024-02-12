import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeValue = 2000;
    const callbackFunc = jest.fn();
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackFunc, timeValue);

    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenCalledWith(callbackFunc, timeValue);
  });

  test('should call callback only after timeout', () => {
    const timeValue = 2000;
    const callbackFunc = jest.fn();
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackFunc, timeValue);
    jest.advanceTimersByTime(timeValue);

    expect(setTimeoutMock).toHaveBeenCalledWith(callbackFunc, timeValue);
    expect(callbackFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeValue = 2000;
    const callbackFunc = jest.fn();
    const setIntervalMock = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackFunc, timeValue);

    expect(setIntervalMock).toHaveBeenCalledTimes(1);
    expect(setIntervalMock).toHaveBeenCalledWith(callbackFunc, timeValue);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeValue = 2000;
    const callbackFunc = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackFunc, timeValue);

    jest.advanceTimersByTime(timeValue);
    expect(callbackFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeValue);
    expect(callbackFunc).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timeValue);
    expect(callbackFunc).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathTestFile = 'testFile.md';
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathTestFile);

    expect(spyJoin).toHaveBeenCalledTimes(1);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathTestFile);
  });

  test('should return null if file does not exist', async () => {
    const failPathTestFile = 'failTestFile.md';

    const spyExistSync = jest
      .spyOn(fs, 'existsSync')
      .mockReturnValueOnce(false);

    const resCallFunc = await readFileAsynchronously(failPathTestFile);

    expect(spyExistSync).toHaveBeenCalledTimes(1);
    expect(resCallFunc).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const truePathTestFile = 'trueTestFile.md';

    const spyExistSync = jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    const spyReadFile = jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValueOnce('hi, how are you?');

    const resCallFunc = await readFileAsynchronously(truePathTestFile);

    expect(spyExistSync).toHaveBeenCalledTimes(1);
    expect(spyReadFile).toHaveBeenCalledTimes(1);

    expect(resCallFunc).toBe('hi, how are you?');
  });
});
