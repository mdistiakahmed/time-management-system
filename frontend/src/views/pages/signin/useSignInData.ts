import { useEffect, useState } from 'react';
import useAuthService from '../../../services/useAuthService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserAuthRequest } from '../../../model/UserDataModel';
import { SIGN_IN_VALIDATION_SCHEMA } from './SignInValidationSchema';

const defaultValues = {
    email: '',
    password: '',
};

const useSignInData = () => {
    const { handleSubmit, control } = useForm<UserAuthRequest>({
        defaultValues: defaultValues,
        resolver: yupResolver(SIGN_IN_VALIDATION_SCHEMA),
    });

    const [busy, setBusy] = useState<boolean>(false);
    const { signIn } = useAuthService();

    useEffect(() => {
        return () => {
            setBusy(false);
        };
    }, []);

    const handleSignInFormSubmit = async (data: UserAuthRequest) => {
        setBusy(true);
        signIn(data).finally(() => {
            setBusy(false);
        });
    };

    return {
        handleSubmit,
        control,
        handleSignInFormSubmit,
        busy,
    };
};

export default useSignInData;
