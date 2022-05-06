import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';
import { BrowserRouter as Router } from 'react-router-dom';
import { UiTextMessages } from '../../../../constants/UiTextMessages';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Not Found Page', () => {
    mockedUsedNavigate.mockClear();
    beforeEach(() => {
        render(
            <Router>
                <NotFound />
            </Router>,
        );
    });

    test('Not found page renders properly', () => {
        expect(
            screen.getByRole('heading', {
                name: UiTextMessages.notFoundPageMessages.errorCode,
            }),
        ).toBeVisible();
        expect(
            screen.getByRole('heading', {
                name: UiTextMessages.notFoundPageMessages.errorMessageHeader,
            }),
        ).toBeVisible();
        expect(
            screen.getByText(
                UiTextMessages.notFoundPageMessages.errorMessageBody,
            ),
        ).toBeVisible();
        expect(
            screen.getByRole('button', {
                name: UiTextMessages.notFoundPageMessages.goHomeButtonText,
            }),
        ).toBeEnabled();
    });

    test('Go back to home button works properly', async () => {
        await act(async () => {
            user.click(getGoToHomeButton());
        });
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
});

const getGoToHomeButton = () => {
    return screen.getByRole('button', {
        name: UiTextMessages.notFoundPageMessages.goHomeButtonText,
    });
};
