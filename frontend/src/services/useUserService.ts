import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { ApplicationContext } from '../context/AppContext';
import HttpErrorHandler from './helpers/HttpErrorHandler';
import useUtilService from './useUtilService';
import { ApiHandler } from './helpers/ApiHandler';
import { UserEntity, UserListPageResponse } from '../model/UserDataModel';
import { UiTextMessages } from '../constants/UiTextMessages';

const useUserService = () => {
    const { dispatch } = useContext(ApplicationContext);
    const { setLoader, setMessage } = useUtilService();
    const { _get, _post, _put, _delete } = ApiHandler();

    const getAllUser = async (
        pageNo: number,
        pageSize: number,
    ): Promise<UserListPageResponse> => {
        setLoader(true);
        return await _get(ApiEndpoints.user.getUsers, {
            params: { pageNo: pageNo, pageSize: pageSize },
        })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const getSingleUser = async (email: string): Promise<UserEntity> => {
        setLoader(true);
        return await _get(ApiEndpoints.user.getSingleUser(email), {})
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const createUser = async (data: UserEntity): Promise<any> => {
        setLoader(true);
        return _post(ApiEndpoints.user.createUser, data)
            .then(() => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.userCreateSuccess,
                );
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const deleteUser = async (username: string): Promise<any> => {
        setLoader(true);
        return _delete(ApiEndpoints.user.deleteUser(username))
            .then((res: any) => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.userDeleteSuccess,
                );
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const updateUser = async (data: UserEntity): Promise<any> => {
        setLoader(true);
        return _put(ApiEndpoints.user.updateUser, data)
            .then((res: any) => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.userUpdateSuccess,
                );
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return { getAllUser, deleteUser, updateUser, createUser, getSingleUser };
};

export default useUserService;
