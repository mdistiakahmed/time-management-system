import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { TASK_MAX_DURATION } from '../../../../../constants/GeneralConstants';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

export const COMPLETED_TASK_UPDATE_VALIDATION_SCHEMA: AnyObjectSchema =
    yup.object({
        description: yup
            .string()
            .min(
                6,
                UiTextMessages.historyPageMessages.descriptionInvalidMessage,
            ),
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
