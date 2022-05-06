export type UserEntity = {
    email: string;
    password?: string;
    preferredWorkingHour: number;
    role?: string;
};

export type UserListPageResponse = {
    userList: UserEntity[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
};

export type UserAuthRequest = {
    email: string;
    password: string;
};

export type DateRangeFilter = {
    startDate: Date;
    endDate: Date;
};

export enum UserRole {
    ROLE_USER = 'ROLE_USER',
    ROLE_MANAGER = 'ROLE_MANAGER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}
