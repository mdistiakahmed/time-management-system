import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { UiTextMessages } from '../../../../constants/UiTextMessages';
import { UserAuthRequest } from '../../../../model/UserDataModel';
import useAuthService from '../../../../services/useAuthService';
import SignIn from '../SignIn';

jest.mock('../../../../services/useAuthService');
const mockUseClientRect = useAuthService as jest.MockedFunction<
    typeof useAuthService
>;

const mockSignIn = jest.fn((data: UserAuthRequest) => {
    return Promise.resolve();
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Sign in form test', () => {
    mockUseClientRect.mockReturnValue({
        signIn: mockSignIn,
        signUp: (data: UserAuthRequest) => {
            return Promise.resolve();
        },
    });

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <Router>
                <SignIn />
            </Router>,
        );
    });

    test('Signin form renders properly', () => {
        expect(getHeader()).toBeVisible();
        expect(getEmailInput()).toBeVisible();
        expect(getPasswordInput()).toBeVisible();
        expect(getSubmitButton()).toBeVisible();
        expect(getSignUpPageLink()).toBeVisible();
    });

    test('Signin form successfully submits data', async () => {
        user.type(getEmailInput(), 'abc@gmail.com');
        user.type(getPasswordInput(), '123456');

        expect(getEmailInput()).toHaveValue('abc@gmail.com');
        expect(getPasswordInput()).toHaveValue('123456');
        await act(async () => {
            user.click(getSubmitButton());
        });
        expect(mockSignIn).toHaveBeenCalledTimes(1);
        expect(mockSignIn).toHaveBeenCalledWith({
            email: 'abc@gmail.com',
            password: '123456',
        });
    });

    test('Shows error when email field is empty', async () => {
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(UiTextMessages.signInPageMessages.emailError),
        ).toBeTruthy();
        expect(mockSignIn).toHaveBeenCalledTimes(0);
    });

    test('Does not show error when email field is not empty', async () => {
        user.type(getEmailInput(), 'abc@gmail.com');
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(UiTextMessages.signInPageMessages.emailError),
        ).toBeFalsy();
    });

    test('Shows error when password field is empty and does not do service call', async () => {
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(UiTextMessages.signInPageMessages.passwordError),
        ).toBeTruthy();
        expect(mockSignIn).toHaveBeenCalledTimes(0);
    });

    test('Does not show error when password field is not empty', async () => {
        user.type(getPasswordInput(), '123456');
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(UiTextMessages.signInPageMessages.passwordError),
        ).toBeFalsy();
    });

    test('Go to sign up page link works correctly', async () => {
        await act(async () => {
            user.click(getSignUpPageLink());
        });
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/signup');
    });
});

const cickSubmitButton = () => {
    user.click(
        screen.getByRole('button', {
            name: UiTextMessages.signInPageMessages.submitButtonText,
        }),
    );
};
const getHeader = () => {
    return screen.getByRole('heading', {
        name: UiTextMessages.signInPageMessages.title,
    });
};
const getEmailInput = () => {
    return screen.getByRole('textbox', { name: /email/i });
};
const getPasswordInput = () => {
    return screen.getByTestId('Password');
};
const getSubmitButton = () => {
    return screen.getByRole('button', {
        name: UiTextMessages.signInPageMessages.submitButtonText,
    });
};
const getSignUpPageLink = () => {
    return screen.getByText(
        UiTextMessages.signInPageMessages.switchToSignUpPage,
    );
};
