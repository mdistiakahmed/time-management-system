import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import useUserService from '../../../../services/useUserService';
import { UserEntity } from '../../../../model/UserDataModel';
import AccountSettings from '../AccountSettings';

jest.mock('../../../../services/useUserService');
const mockUseUserService = useUserService as jest.MockedFunction<
    typeof useUserService
>;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Account settings page test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Account settings page view data properly', async () => {
        const mockGetSingleUser = jest.fn(() => Promise.resolve(userEntity));
        mockUseUserService.mockReturnValue({
            ...initialMocks,
            getSingleUser: mockGetSingleUser,
        });
        await renderUserPage();
        expect(mockGetSingleUser).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/account settings/i)).toBeVisible();
    });
});

const renderUserPage = async () => {
    await act(async () => {
        render(
            <Router>
                <AccountSettings />
            </Router>,
        );
    });
};

const userEntity: UserEntity = {
    email: 'test@gmail.com',
    preferredWorkingHour: 12,
    role: 'ROLE_USER',
};

const initialMocks = {
    getAllUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    getSingleUser: jest.fn(),
};
