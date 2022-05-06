import RoutesHandler from './Routes';
import { useAppReducer } from '../hooks/useAppReducer';
import { ApplicationContext } from '../context/AppContext';
import ToastAlert from './common-components/ToastAlert';
import Loader from './common-components/Loader';

function App() {
    const { state, dispatch } = useAppReducer();
    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            <div className="App">
                <RoutesHandler />
                <ToastAlert />
                <Loader />
            </div>
        </ApplicationContext.Provider>
    );
}

export default App;
