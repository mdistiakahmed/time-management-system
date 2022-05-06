import { Button, Box, Alert } from '@mui/material';
import Modal from '../../../../common-components/Modal';
import { FormInputText } from '../../../../common-components/forms/FormInputText';
import useCreateNewOngoingTaskModalData from './useCreateNewOngoingTaskModalData';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { containerStyles } from '../../../../../styles/ModalStyle';

const CreateNewOngoingTaskModal = ({
    isOpen,
    onCancel,
}: CreateNewOngoingTaskModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useCreateNewOngoingTaskModalData({
            isOpen,
            onCancel,
        });

    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.liveTrackingPageMessages.createModalTitle}
        </Alert>
    );

    const body = (
        <Box sx={{ ...containerStyles, minWidth: '400px' }}>
            <FormInputText
                name="description"
                control={control}
                label={
                    UiTextMessages.liveTrackingPageMessages
                        .descriptionInputLabel
                }
                required={true}
            />
        </Box>
    );

    const actions = (
        <div>
            <Button onClick={onDialogClose}>
                {' '}
                {
                    UiTextMessages.liveTrackingPageMessages.modalCloseButtonText
                }{' '}
            </Button>
            <Button onClick={handleSubmit(onSubmitDialog)}>
                {UiTextMessages.liveTrackingPageMessages.modalAddButtonText}
            </Button>
        </div>
    );
    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onDialogClose}
            body={body}
            modalActions={actions}
        />
    );
};

export default CreateNewOngoingTaskModal;

export type CreateNewOngoingTaskModalProps = {
    isOpen: boolean;
    onCancel: any;
};
