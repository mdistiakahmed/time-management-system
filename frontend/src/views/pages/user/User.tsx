import UserTable from './table/UserTable';
import useUserData from './useUserData';
import { UserDataContext } from '../../../context/UserDataContext';
import UserCreateModal from './modals/create/UserCreateModal';
import Topbar from '../../common-components/Topbar';
import TableContainer from '../../common-components/TableContainer';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { buttonStyles } from '../../../styles/ButtonStyle';

const User = () => {
    const userLogic = useUserData();

    const leftButtons = (
        <div>
            <Button
                variant="contained"
                sx={buttonStyles}
                startIcon={<AddIcon />}
                onClick={() => userLogic.setCreateModalOpen(true)}
            >
                {UiTextMessages.userPageMessages.addButtonText}
            </Button>
        </div>
    );

    return (
        <UserDataContext.Provider value={userLogic}>
            <div>
                <Topbar />
                <TableContainer
                    leftButtons={leftButtons}
                    table={<UserTable />}
                />
                <UserCreateModal
                    isOpen={userLogic.createModalOpen}
                    onCancel={() => userLogic.setCreateModalOpen(false)}
                />
            </div>
        </UserDataContext.Provider>
    );
};

export default User;
