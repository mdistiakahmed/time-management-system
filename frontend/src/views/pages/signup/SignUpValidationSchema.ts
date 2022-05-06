import { AnyObjectSchema } from 'yup';
import FormValidationConstants from '../../common-components/forms/FormValidationConstants';
import * as yup from 'yup';

export const SIGN_UP_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: FormValidationConstants.REQUIRED_VALID_EMAIL,
    password: FormValidationConstants.REQUIRED_VALID_PASSWORD,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});
