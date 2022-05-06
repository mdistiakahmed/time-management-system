import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

export const TASK_FILTER_BY_DATE_VALIDATION_SCHEMA: AnyObjectSchema =
    yup.object({
        startDate: yup.date().required(),
        endDate: yup
            .date()
            .required()
            .when(
                'startDate',
                (startDate, schema) =>
                    startDate &&
                    schema.min(
                        startDate,
                        UiTextMessages.historyPageMessages
                            .endDateInvalidMessage,
                    ),
            ),
    });
