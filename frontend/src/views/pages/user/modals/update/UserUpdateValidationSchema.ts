import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

export const USER_UPDATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
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
