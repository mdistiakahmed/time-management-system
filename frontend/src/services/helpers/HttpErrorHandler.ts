import { UiTextMessages } from '../../constants/UiTextMessages';
import { AppReducerActionKind } from '../../hooks/useAppReducer';

const HttpErrorHandler = (error: any, dispatch: any) => {
    let errorMessage = '';
    if (error?.response) {
        if (error.response.status === 400) {
            errorMessage =
                error.response.data?.message ||
                UiTextMessages.httpErrorMessages.error400;
        } else if (error.response.status === 401) {
            errorMessage =
                error.response.data?.message ||
                UiTextMessages.httpErrorMessages.error401;
        } else if (error.response.status === 403) {
            errorMessage =
                error.response.data?.message ||
                UiTextMessages.httpErrorMessages.error403;
        } else if (error.response.status === 404) {
            errorMessage =
                error.response.data?.message ||
                UiTextMessages.httpErrorMessages.error404;
        } else if (error.response.status === 409) {
            errorMessage =
                error.response.data?.message ||
                UiTextMessages.httpErrorMessages.error409;
        } else {
            errorMessage = 'Error...' + (error.message || '');
        }
    } else if (error?.request) {
        errorMessage = UiTextMessages.httpErrorMessages.error000;
    } else {
        errorMessage = UiTextMessages.httpErrorMessages.errorUnknown;
    }
    dispatch({
        type: AppReducerActionKind.SET_ALERT,
        payload: { msg: errorMessage },
    });
};

export default HttpErrorHandler;
