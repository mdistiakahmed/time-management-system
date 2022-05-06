import { CircularProgress } from '@mui/material';
import CSS from 'csstype';
import { useContext } from 'react';
import { ApplicationContext } from '../../context/AppContext';

const divStyles: CSS.Properties = {
    backgroundColor: '#251a1a99',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 200000,
};

const Loader = () => {
    const { state } = useContext(ApplicationContext);
    const isLoading = state.isLoading;
    if (!isLoading) {
        return null;
    }
    return (
        <div style={divStyles}>
            <CircularProgress size={100} />
        </div>
    );
};

export default Loader;
