import { useNavigate } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { AppReducerActionKind } from '../hooks/useAppReducer';
import { useContext } from 'react';
import { ApplicationContext } from '../context/AppContext';
import HttpErrorHandler from './helpers/HttpErrorHandler';
import { ApiHandler } from './helpers/ApiHandler';
import { UserAuthRequest } from '../model/UserDataModel';

const useAuthService = () => {
    const { dispatch } = useContext(ApplicationContext);
    const navigate = useNavigate();
    const { _post } = ApiHandler();

    const signUp = async (data: UserAuthRequest): Promise<any> => {
        return _post(ApiEndpoints.auth.signUp, data)
            .then((res: any) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res?.token ?? '',
                });
                navigate('/');
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            });
    };
    const signIn = async (data: UserAuthRequest): Promise<any> => {
        await _post(ApiEndpoints.auth.signIn, data)
            .then((res: any) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res?.token ?? '',
                });
                navigate('/');
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            });
    };

    return { signUp, signIn };
};

export default useAuthService;
