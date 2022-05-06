import { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../../constants/GeneralConstants';
import { UserEntity, UserListPageResponse } from '../../../model/UserDataModel';
import useUserService from '../../../services/useUserService';

const useUserData = () => {
    const [userTableData, setUserTableData] = useState<UserListPageResponse>({
        userList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    });
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const userService = useUserService();

    const setPageNumber = (pageNo: number) => {
        setUserTableData({
            ...userTableData,
            pageNumber: pageNo,
        });
    };

    const loadUserData = async (): Promise<any> => {
        userService
            .getAllUser(userTableData.pageNumber, PAGE_SIZE)
            .then((res: UserListPageResponse) => {
                if (res.userList.length === 0) {
                    const newPageNumber = Math.max(0, res.pageNumber - 1);
                    setUserTableData({ ...res, pageNumber: newPageNumber });
                } else {
                    setUserTableData(res);
                }
                return Promise.resolve(res);
            });
    };

    const deleteUser = async (username: string): Promise<any> => {
        return userService.deleteUser(username).then((res) => {
            loadUserData();
            return Promise.resolve(res);
        });
    };

    const createUser = async (data: UserEntity): Promise<any> => {
        return userService
            .createUser(data)
            .then(async (res) => {
                loadUserData();
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    const updateUser = async (data: UserEntity): Promise<any> => {
        return userService.updateUser(data).then((res) => {
            loadUserData();
            return Promise.resolve(res);
        });
    };

    useEffect(() => {
        loadUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTableData.pageNumber]);

    return {
        loadUserData,
        deleteUser,
        createUser,
        updateUser,
        setPageNumber,
        userTableData,
        createModalOpen,
        setCreateModalOpen,
    };
};

export default useUserData;
