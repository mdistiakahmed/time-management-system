import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import FormValidationConstants from '../../../../common-components/forms/FormValidationConstants';

export const USER_CREATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: FormValidationConstants.REQUIRED_VALID_EMAIL,
    password: FormValidationConstants.REQUIRED_VALID_PASSWORD,
    preferredWorkingHour: yup
        .number()
        .test(
            'maxvalue',
            UiTextMessages.userPageMessages
                .preferredWorkingHourInvalidateMessage,
            (number) =>
                number
                    ? Number.isInteger(number * 10) &&
                      number > 0 &&
                      number <= 24
                    : false,
        ),
    role: yup
        .string()
        .required(UiTextMessages.userPageMessages.roleInvalidMessage),
});
