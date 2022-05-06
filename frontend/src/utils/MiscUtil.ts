import { UserRole } from '../model/UserDataModel';

export const UserRoleSuffix = (value: string) => value.replace('ROLE_', '');
export const UserRoleArray = Object.values(UserRole).map((v) =>
    UserRoleSuffix(v),
);
