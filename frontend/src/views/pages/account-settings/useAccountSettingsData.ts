import { useContext, useEffect, useState } from 'react';
import useUserService from '../../../services/useUserService';
import { useAuth } from '../../../hooks/useAuth';
import { UserEntity } from '../../../model/UserDataModel';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApplicationContext } from '../../../context/AppContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { ACCOUNT_SETTING_VALIDATION_SCHEMA } from './AccountSettingsValidationSchema';

type IFSettingsInput = {
    preferredWorkingHour: number;
};

const useAccountSettingsData = () => {
    const { dispatch } = useContext(ApplicationContext);
    const userService = useUserService();
    const { authenticatedUserEmail } = useAuth();
    const [userEntity, setUserEntity] = useState<UserEntity>({
        email: authenticatedUserEmail,
        preferredWorkingHour: 0,
    });

    const { handleSubmit, control, reset } = useForm<IFSettingsInput>({
        defaultValues: { preferredWorkingHour: 0 },
        resolver: yupResolver(ACCOUNT_SETTING_VALIDATION_SCHEMA),
    });

    const onSubmitDialog = async (inputData: IFSettingsInput) => {
        if (
            inputData.preferredWorkingHour === userEntity.preferredWorkingHour
        ) {
            dispatch({
                type: AppReducerActionKind.SET_ALERT,
                payload: {
                    msg: UiTextMessages.accountSettingsPage
                        .sameContentErrorMessage,
                },
            });
            return;
        }
        userService
            .updateUser({
                ...userEntity,
                preferredWorkingHour: inputData.preferredWorkingHour,
            })
            .then((res: UserEntity) => {
                setUserEntity(res);
            });
    };

    const onReset = () => {
        reset({ preferredWorkingHour: userEntity.preferredWorkingHour });
    };

    useEffect(() => {
        userService
            .getSingleUser(authenticatedUserEmail)
            .then((res: UserEntity) => {
                setUserEntity(res);
                reset({ preferredWorkingHour: res.preferredWorkingHour });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        handleSubmit,
        control,
        onSubmitDialog,
        userEntity,
        onReset,
    };
};

export default useAccountSettingsData;
