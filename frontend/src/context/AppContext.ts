import { createContext } from 'react';
import { AppReducerAction, AppState } from '../hooks/useAppReducer';

type AppContextType = {
    state: AppState;
    dispatch: (action: AppReducerAction) => void;
};

const initialValue = {
    state: {
        token: { value: '' },
        alert: { msg: '' },
        isLoading: false,
    },
    dispatch: () => ({}),
};

export const ApplicationContext = createContext<AppContextType>(initialValue);
