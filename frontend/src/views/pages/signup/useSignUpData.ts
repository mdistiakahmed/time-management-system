import { useEffect, useState } from 'react';
import useAuthService from '../../../services/useAuthService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGN_UP_VALIDATION_SCHEMA } from './SignUpValidationSchema';

type SignUpFormInput = {
    email: string;
    password: string;
    confirmPassword: string;
};

const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const useSignUpData = () => {
    const { handleSubmit, control } = useForm<SignUpFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(SIGN_UP_VALIDATION_SCHEMA),
    });
    const { signUp } = useAuthService();
    const [busy, setBusy] = useState(false);

    const handleSignUpFormSubmit = async (data: SignUpFormInput) => {
        setBusy(true);
        signUp({
            email: data.email,
            password: data.password,
        }).finally(() => {
            setBusy(false);
        });
    };
    useEffect(() => {
        return () => {
            setBusy(false);
        };
    }, []);

    return {
        handleSubmit,
        control,
        handleSignUpFormSubmit,
        busy,
    };
};

export default useSignUpData;
