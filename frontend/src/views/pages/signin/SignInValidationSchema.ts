import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { UiTextMessages } from '../../../constants/UiTextMessages';

export const SIGN_IN_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: yup.string().required(UiTextMessages.signInPageMessages.emailError),
    password: yup
        .string()
        .required(UiTextMessages.signInPageMessages.passwordError),
});
