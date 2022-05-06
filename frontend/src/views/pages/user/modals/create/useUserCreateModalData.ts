import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { USER_CREATE_VALIDATION_SCHEMA } from './UserCreateValidationSchema';
import { UserCreateModalProps } from './UserCreateModal';
import { useAuth } from '../../../../../hooks/useAuth';
import { UserRole } from '../../../../../model/UserDataModel';
import { UserRoleSuffix } from '../../../../../utils/MiscUtil';

type IFUserCreateInput = {
    email: string;
    password: string;
    preferredWorkingHour: number;
    role: string;
};

const defaultValues = {
    email: '',
    password: '',
    preferredWorkingHour: 8,
    role: UserRoleSuffix(UserRole.ROLE_USER),
};

const useUserCreateModalData = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, reset } = useForm<IFUserCreateInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(USER_CREATE_VALIDATION_SCHEMA),
    });
    const { isAdmin } = useAuth();
    const { createUser } = useContext(UserDataContext);

    const onSubmitDialog = async (data: IFUserCreateInput) => {
        const role = 'ROLE_' + data.role;
        createUser({ ...data, role: role }).then(() => {
            onDialogClose();
        });
    };

    const onDialogClose = () => {
        reset();
        onCancel();
    };

    return {
        handleSubmit,
        control,
        onDialogClose,
        onSubmitDialog,
        isAdmin,
    };
};

export default useUserCreateModalData;
