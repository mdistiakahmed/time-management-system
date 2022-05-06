import { Button, Grid, Box, Alert, TextField } from '@mui/material';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { UserEntity } from '../../../../../model/UserDataModel';
import { containerStyles } from '../../../../../styles/ModalStyle';
import { UserRoleArray } from '../../../../../utils/MiscUtil';
import FormInputDropdown from '../../../../common-components/forms/FormInputDropdown';
import { FormInputText } from '../../../../common-components/forms/FormInputText';
import Modal from '../../../../common-components/Modal';
import useUserUpdateModalData from './useUserUpdateModalData';

const UserUpdateModal = ({
    isOpen,
    onCancel,
    userEntity,
}: UserUpdateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog, isAdmin } =
        useUserUpdateModalData({
            isOpen,
            onCancel,
            userEntity,
        });

    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.userPageMessages.userUpdateModalTitle}
        </Alert>
    );

    const body = (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={userEntity.email}
                        fullWidth
                        label={UiTextMessages.userPageMessages.emailInputLabel}
                        type="text"
                        variant="outlined"
                        disabled={true}
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
            <Button onClick={handleSubmit(onSubmitDialog)}>Update</Button>
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

export default UserUpdateModal;

export type UserUpdateModalProps = {
    isOpen: boolean;
    onCancel: any;
    userEntity: UserEntity;
};
