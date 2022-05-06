import * as Yup from 'yup';
import { UiTextMessages } from '../../../constants/UiTextMessages';

export default class FormValidationConstants {
    static REQUIRED_VALID_EMAIL = Yup.string()
        .matches(
            /^(?=.{1,40}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            {
                message: UiTextMessages.signUpPageMessages.emailInvalidMessage,
                excludeEmptyString: true,
            },
        )
        .required(UiTextMessages.signUpPageMessages.emailAbsentMessage);

    static REQUIRED_VALID_PASSWORD = Yup.string()
        .required(UiTextMessages.signUpPageMessages.passwordAbsentMessage)
        .min(6, UiTextMessages.signUpPageMessages.passwordMinLengthError)
        .max(20, UiTextMessages.signUpPageMessages.passwordMaxLengthError);

    static CONFIRM_PASSWORD = Yup.string().oneOf(
        [Yup.ref('password'), null],
        UiTextMessages.signUpPageMessages.confirmPasswordErrorMessage,
    );
}
