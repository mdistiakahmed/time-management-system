import { ApiHandler } from '../ApiHandler';
import { AxiosResponse } from 'axios';

const testData = [
    {
        userId: 1,
        title: 'todo-test-1',
    },
];

const mockedResponse: AxiosResponse = {
    data: testData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
};

const mockGet = jest.fn().mockResolvedValue(mockedResponse);
const mockPost = jest.fn().mockResolvedValue(mockedResponse);
const mockPut = jest.fn().mockResolvedValue(mockedResponse);
const mockDelete = jest.fn().mockResolvedValue({ ...mockedResponse, data: 1 });

jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: mockGet,
            post: mockPost,
            put: mockPut,
            delete: mockDelete,
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() },
            },
        })),
    };
});

//const mockedAxios = axios as jest.MockedFunction<typeof axios>;
const { _get, _post, _put, _delete } = ApiHandler();

beforeEach(() => {
    jest.clearAllMocks();
});

test('_get method works properly', async () => {
    const result = await _get('abc', 'abc');
    expect(mockGet).toHaveBeenCalled();
    expect(result).toEqual(testData);
});

test('_post method works properly', async () => {
    const result = await _post('abc', 'abc');
    expect(mockPost).toHaveBeenCalled();
    expect(result).toEqual(testData);
});

test('_put method works properly', async () => {
    const result = await _put('abc', 'abc');
    expect(mockPut).toHaveBeenCalled();
    expect(result).toEqual(testData);
});

test('_delete method works properly', async () => {
    const result = await _delete('abc');
    expect(mockDelete).toHaveBeenCalled();
    expect(result).toEqual(1);
});
