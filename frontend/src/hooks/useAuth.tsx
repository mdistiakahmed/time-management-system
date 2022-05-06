import jwt_decode from 'jwt-decode';
import { AuthConstants } from '../constants/GeneralConstants';
import { UserRole } from '../model/UserDataModel';

export const useAuth = () => {
    let isAuthenticated = false;
    let isAdmin = false;
    let isManager = false;
    let authenticatedUserEmail = '';
    const rawToken = localStorage.getItem(AuthConstants.AUTH_TOKEN);
    if (rawToken) {
        const decoded: any = jwt_decode(rawToken);
        if (decoded.exp * 1000 >= new Date().getTime()) {
            isAuthenticated = true;
        }
        if (decoded.roles === UserRole.ROLE_ADMIN) {
            isAdmin = true;
        } else if (decoded.roles === UserRole.ROLE_MANAGER) {
            isManager = true;
        }
        authenticatedUserEmail = decoded.sub;
    }

    return {
        isAuthenticated,
        isAdmin,
        isManager,
        authenticatedUserEmail,
    };
};
