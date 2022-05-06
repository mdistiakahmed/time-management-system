import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

export const CREATE_ONGOING_TASK_VALIDATION_SCHEMA: AnyObjectSchema =
    yup.object({
        description: yup
            .string()
            .min(
                6,
                UiTextMessages.liveTrackingPageMessages
                    .descriptionInvalidMessage,
            ),
    });
