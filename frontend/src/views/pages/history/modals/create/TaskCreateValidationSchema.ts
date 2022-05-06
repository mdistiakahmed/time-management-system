import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { TASK_MAX_DURATION } from '../../../../../constants/GeneralConstants';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

const getMaxMomentForTaskCreation = () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);

    return today;
};

export const TASK_CREATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    date: yup
        .date()
        .max(
            getMaxMomentForTaskCreation(),
            UiTextMessages.historyPageMessages.dateInvalidMessage,
        )
        .required(),
    description: yup
        .string()
        .min(6, UiTextMessages.historyPageMessages.descriptionInvalidMessage),
    duration: yup
        .number()
        .test(
            'maxDigitsAfterDecimal',
            UiTextMessages.historyPageMessages.durationInvalidMessage,
            (number) =>
                number
                    ? Number.isInteger(number * 10) &&
                      number > 0 &&
                      number <= TASK_MAX_DURATION
                    : false,
        ),
});
