import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';
import User from '../User';
import useUserService from '../../../../services/useUserService';
import { UserListPageResponse } from '../../../../model/UserDataModel';

jest.mock('../../../../services/useUserService');
const mockUseUserService = useUserService as jest.MockedFunction<
    typeof useUserService
>;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('User page test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('User page shows no data message', async () => {
        const mockGetAllUsers = jest.fn(() => Promise.resolve(emptyUserList));
        mockUseUserService.mockReturnValue({
            ...initialMocks,
            getAllUser: mockGetAllUsers,
        });
        await renderUserPage();
        expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('img', { name: /no data/i })).toBeVisible();
    });

    test('User page shows data properly', async () => {
        const mockGetAllUsers = jest.fn(() =>
            Promise.resolve(userListWithData),
        );
        mockUseUserService.mockReturnValue({
            ...initialMocks,
            getAllUser: mockGetAllUsers,
        });
        await renderUserPage();
        expect(screen.queryByRole('img', { name: /no data/i })).toBeFalsy();
        expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
        expect(
            screen.queryByRole('rowheader', { name: /test@gmail\.com/i }),
        ).toBeTruthy();
    });

    test('Delete button works properly', async () => {
        const mockGetAllUsers = jest
            .fn()
            .mockResolvedValueOnce(userListWithData)
            .mockResolvedValue(emptyUserList);
        const mockDeleteUser = jest.fn(() => Promise.resolve());
        mockUseUserService.mockReturnValue({
            ...initialMocks,
            getAllUser: mockGetAllUsers,
            deleteUser: mockDeleteUser,
        });
        await renderUserPage();
        expect(screen.getByRole('button', { name: /delete/i })).toBeVisible();

        await act(async () => {
            user.click(screen.getByRole('button', { name: /delete/i }));
        });

        expect(screen.getByText(/user delete confirmation/i)).toBeVisible();

        await act(async () => {
            user.click(screen.getByRole('button', { name: /delete/i }));
        });

        expect(mockDeleteUser).toHaveBeenCalledTimes(1);
        expect(mockGetAllUsers).toHaveBeenCalledTimes(2);
    });
});

const renderUserPage = async () => {
    await act(async () => {
        render(
            <Router>
                <User />
            </Router>,
        );
    });
};

const emptyUserList: UserListPageResponse = {
    userList: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
};

const userListWithData: UserListPageResponse = {
    userList: [
        { email: 'test@gmail.com', preferredWorkingHour: 8, role: 'ROLE_USER' },
    ],
    pageNumber: 0,
    pageSize: 1,
    totalElements: 1,
    totalPages: 1,
};

const initialMocks = {
    getAllUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    createUser: jest.fn(),
    getSingleUser: jest.fn(),
};
