import { useContext } from 'react';
import { ApplicationContext } from '../context/AppContext';
import { AppReducerActionKind } from '../hooks/useAppReducer';

const useUtilService = () => {
    const { dispatch } = useContext(ApplicationContext);

    const setLoader = (value: boolean) => {
        dispatch({
            type: AppReducerActionKind.SET_LOADER,
            payload: value,
        });
    };

    const setMessage = (value: string) => {
        dispatch({
            type: AppReducerActionKind.SET_ALERT,
            payload: { msg: value, type: 'success' },
        });
    };

    return { setLoader, setMessage };
};

export default useUtilService;
