import { UiTextMessages } from '../../../constants/UiTextMessages';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';
import HttpErrorHandler from '../HttpErrorHandler';

test('Error 400', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(400), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(400));
});

test('Error 401', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(401), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(401));
});

test('Error 403', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(403), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(403));
});

test('Error 404', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(404), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(404));
});

test('Error 409', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(409), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(409));
});

test('Error 5xx', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(500), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(500));
});

test('Server not responding', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(0), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(0));
});

test('Unknown error', async () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    HttpErrorHandler(getError(-1), mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(getExpectedPayload(-1));
});

const getError = (status: number) => {
    switch (status) {
        case 0:
            return { request: {} };
        case -1:
            return undefined;
        default:
            return { response: { status: status } };
    }
};

const getExpectedPayload = (status: number) => {
    const expectedPayload = { type: AppReducerActionKind.SET_ALERT };
    switch (status) {
        case 400:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error400 },
            };
        case 401:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error401 },
            };
        case 403:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error403 },
            };
        case 404:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error404 },
            };
        case 409:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error409 },
            };
        case 500:
            return {
                ...expectedPayload,
                payload: { msg: 'Error...' },
            };
        case 0:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.error000 },
            };
        case -1:
            return {
                ...expectedPayload,
                payload: { msg: UiTextMessages.httpErrorMessages.errorUnknown },
            };
    }
};
