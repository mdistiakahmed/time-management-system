import { createContext } from 'react';
import { UserEntity, UserListPageResponse } from '../model/UserDataModel';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {
        userList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    },
    loadUserData: () => {
        return Promise.resolve();
    },
    deleteUser: () => {
        return Promise.resolve();
    },
    createUser: () => {
        return Promise.resolve();
    },
    updateUser: () => {
        return Promise.resolve();
    },
    setPageNumber: () => ({}),
    createModalOpen: false,
    setCreateModalOpen: () => ({}),
});

export type UserDataContextType = {
    userTableData: UserListPageResponse;
    loadUserData: () => Promise<any>;
    deleteUser: (username: string) => Promise<any>;
    createUser: (data: UserEntity) => Promise<void>;
    updateUser: (data: UserEntity) => Promise<void>;
    setPageNumber: (pageNo: number) => void;
    createModalOpen: boolean;
    setCreateModalOpen: any;
};
