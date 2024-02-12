import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const bURL = 'https://jsonplaceholder.typicode.com';
    const dataTest = { data: 'test' };

    const axiosMock = axios as jest.Mocked<typeof axios>;

    axiosMock.create = jest.fn(() => axiosMock);

    axiosMock.get.mockImplementationOnce(() => Promise.resolve(dataTest));

    const resCallFunc = await throttledGetDataFromApi(dataTest.data);

    expect(axiosMock.create).toHaveBeenCalledTimes(1);
    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL: bURL });
    expect(resCallFunc).toEqual(dataTest.data);
  });

  test('should perform request to correct provided url', async () => {
    const dataTest = { data: 'test' };

    const axiosMock = axios as jest.Mocked<typeof axios>;

    axiosMock.create = jest.fn(() => axiosMock);
    axiosMock.get.mockImplementationOnce(() => Promise.resolve(dataTest));

    const resCallFunc = await throttledGetDataFromApi(dataTest.data);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(dataTest.data);
    expect(resCallFunc).toEqual(dataTest.data);
  });

  test('should return response data', async () => {
    const dataTest = { data: 'test' };

    const axiosMock = axios as jest.Mocked<typeof axios>;

    axiosMock.create = jest.fn(() => axiosMock);
    axiosMock.get.mockImplementationOnce(() => Promise.resolve(dataTest));

    axiosMock.get.mockResolvedValueOnce(dataTest.data);

    const resCallFunc = await throttledGetDataFromApi(dataTest.data);

    expect(resCallFunc).toEqual(dataTest.data);
  });
});
