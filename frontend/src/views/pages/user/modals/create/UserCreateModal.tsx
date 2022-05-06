import { Button, Grid, Box, Alert } from '@mui/material';
import { FormInputText } from '../../../../common-components/forms/FormInputText';
import FormInputDropdown from '../../../../common-components/forms/FormInputDropdown';
import useUserCreateModalData from './useUserCreateModalData';
import Modal from '../../../../common-components/Modal';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { UserRoleArray } from '../../../../../utils/MiscUtil';
import { containerStyles } from '../../../../../styles/ModalStyle';

const UserCreateModal = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog, isAdmin } =
        useUserCreateModalData({
            isOpen,
            onCancel,
        });
    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.userPageMessages.addUserModalTitle}
        </Alert>
    );

    const body = (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormInputText
                        name="email"
                        control={control}
                        label={UiTextMessages.userPageMessages.emailInputLabel}
                        required={true}
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputText
                        name="password"
                        control={control}
                        label={
                            UiTextMessages.userPageMessages.passwordInputLabel
                        }
                        type="password"
                        required={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputText
                        name="preferredWorkingHour"
                        control={control}
                        label={
                            UiTextMessages.userPageMessages
                                .preferredWorkingHourInputLabel
                        }
                        type="number"
                        required={true}
                    />
                </Grid>
                {isAdmin && (
                    <Grid item xs={12}>
                        <FormInputDropdown
                            name="role"
                            control={control}
                            label={
                                UiTextMessages.userPageMessages.roleInputLabel
                            }
                            dropDownOptions={UserRoleArray}
                            isRequired={true}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );

    const actions = (
        <div>
            <Button onClick={onDialogClose}> Cancel </Button>
            <Button onClick={handleSubmit(onSubmitDialog)}>Add</Button>
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

export default UserCreateModal;

export type UserCreateModalProps = {
    isOpen: boolean;
    onCancel: any;
};
