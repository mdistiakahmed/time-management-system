import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { useAuth } from '../../../../../hooks/useAuth';
import { UserUpdateModalProps } from './UserUpdateModal';
import { USER_UPDATE_VALIDATION_SCHEMA } from './UserUpdateValidationSchema';
import { UserRoleSuffix } from '../../../../../utils/MiscUtil';

type IFUserUpdateInput = {
    preferredWorkingHour: number;
    role: string;
};

const useUserUpdateModalData = ({
    isOpen,
    onCancel,
    userEntity,
}: UserUpdateModalProps) => {
    const { handleSubmit, control, reset } = useForm<IFUserUpdateInput>({
        defaultValues: {},
        resolver: yupResolver(USER_UPDATE_VALIDATION_SCHEMA),
    });
    const { isAdmin } = useAuth();
    const { updateUser } = useContext(UserDataContext);

    const onSubmitDialog = async (data: IFUserUpdateInput) => {
        const role = 'ROLE_' + data.role;
        updateUser({
            ...userEntity,
            role: role,
            preferredWorkingHour: data.preferredWorkingHour,
        }).then(() => {
            onDialogClose();
        });
    };

    const onDialogClose = () => {
        onCancel();
    };

    useEffect(() => {
        if (isOpen) {
            reset({
                preferredWorkingHour: userEntity.preferredWorkingHour,
                role: UserRoleSuffix(userEntity.role || ''),
            });
        } else {
            onDialogClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return {
        handleSubmit,
        control,
        onDialogClose,
        onSubmitDialog,
        isAdmin,
    };
};

export default useUserUpdateModalData;
