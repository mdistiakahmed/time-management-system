import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { UiTextMessages } from '../../../../constants/UiTextMessages';
import { UserAuthRequest } from '../../../../model/UserDataModel';
import useAuthService from '../../../../services/useAuthService';
import SignUp from '../SignUp';

jest.mock('../../../../services/useAuthService');
const mockUseClientRect = useAuthService as jest.MockedFunction<
    typeof useAuthService
>;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

const mockSignUpHandler = jest.fn((data: UserAuthRequest) => {
    return Promise.resolve();
});

describe('Sign up form test', () => {
    mockUseClientRect.mockReturnValue({
        signIn: () => Promise.resolve(),
        signUp: mockSignUpHandler,
    });

    beforeEach(() => {
        mockSignUpHandler.mockClear();
        mockedUsedNavigate.mockClear();
        render(
            <Router>
                <SignUp />
            </Router>,
        );
    });

    test('SignUp form renders properly', () => {
        expect(getHeader()).toBeVisible();
        expect(getEmailInput()).toBeVisible();
        expect(getPasswordInput()).toBeVisible();
        expect(getConfirmPasswordInput()).toBeVisible();
        expect(getSubmitButton()).toBeVisible();
        expect(getSignInPageLink()).toBeVisible();
    });

    test('SignUp form successfully submits data', async () => {
        user.type(getEmailInput(), 'abc@gmail.com');
        user.type(getPasswordInput(), '123456');
        user.type(getConfirmPasswordInput(), '123456');

        expect(getEmailInput()).toHaveValue('abc@gmail.com');
        expect(getPasswordInput()).toHaveValue('123456');
        expect(getConfirmPasswordInput()).toHaveValue('123456');
        await act(async () => {
            user.click(getSubmitButton());
        });
        expect(mockSignUpHandler).toHaveBeenCalledTimes(1);
        expect(mockSignUpHandler).toHaveBeenCalledWith({
            email: 'abc@gmail.com',
            password: '123456',
        });
    });

    test('Shows error when email field is empty', async () => {
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(
                UiTextMessages.signUpPageMessages.emailAbsentMessage,
            ),
        ).toBeTruthy();
        expect(mockSignUpHandler).toHaveBeenCalledTimes(0);
    });

    test('Shows error when invalid email field', async () => {
        user.type(getEmailInput(), 'abc@gmail');
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(
                UiTextMessages.signUpPageMessages.emailInvalidMessage,
            ),
        ).toBeTruthy();
        expect(mockSignUpHandler).toHaveBeenCalledTimes(0);
    });

    test('Shows error when password field is empty', async () => {
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(
                UiTextMessages.signUpPageMessages.passwordAbsentMessage,
            ),
        ).toBeTruthy();
        expect(mockSignUpHandler).toHaveBeenCalledTimes(0);
    });

    test('Shows error when password field is less then 6 characters', async () => {
        user.type(getPasswordInput(), '123');
        await act(async () => {
            cickSubmitButton();
        });
        expect(
            screen.queryByText(
                UiTextMessages.signUpPageMessages.passwordMinLengthError,
            ),
        ).toBeTruthy();
        expect(mockSignUpHandler).toHaveBeenCalledTimes(0);
    });

    test('Go to sign in page link works correctly', async () => {
        await act(async () => {
            user.click(getSignInPageLink());
        });
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/signin');
    });
});

const cickSubmitButton = () => {
    user.click(
        screen.getByRole('button', {
            name: UiTextMessages.signUpPageMessages.submitButtonText,
        }),
    );
};
const getHeader = () => {
    return screen.getByRole('heading', {
        name: UiTextMessages.signUpPageMessages.title,
    });
};
const getEmailInput = () => {
    return screen.getByRole('textbox', { name: /email/i });
};
const getPasswordInput = () => {
    return screen.getByTestId('Password');
};

const getConfirmPasswordInput = () => {
    return screen.getByTestId('Confirm Password');
};

const getSubmitButton = () => {
    return screen.getByRole('button', {
        name: UiTextMessages.signUpPageMessages.submitButtonText,
    });
};
const getSignInPageLink = () => {
    return screen.getByText(
        UiTextMessages.signUpPageMessages.switchToSignInPage,
    );
};
