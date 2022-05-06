import { Button } from '@mui/material';
import TableContainer from '../../common-components/TableContainer';
import Topbar from '../../common-components/Topbar';
import AddIcon from '@mui/icons-material/Add';
import useLiveTrackingData from './useLiveTrackingData';
import { LiveTrackingDataContext } from '../../../context/LiveTrackingDataContext';
import CreateNewOngoingTaskModal from './modals/create/CreateNewOngoingTaskModal';
import OnGoingTaskTable from './table/OnGoingTaskTable';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { buttonStyles } from '../../../styles/ButtonStyle';

const LiveTracking = () => {
    const liveTrackingData = useLiveTrackingData();

    const leftButtons = (
        <div>
            <Button
                variant="contained"
                sx={buttonStyles}
                startIcon={<AddIcon />}
                onClick={() =>
                    liveTrackingData.setCreateOngoingTaskModalOpen(true)
                }
            >
                {UiTextMessages.liveTrackingPageMessages.addButtonText}
            </Button>
        </div>
    );

    return (
        <LiveTrackingDataContext.Provider value={liveTrackingData}>
            <div>
                <Topbar />
                <TableContainer
                    leftButtons={leftButtons}
                    table={<OnGoingTaskTable />}
                />
                <CreateNewOngoingTaskModal
                    isOpen={liveTrackingData.createOngoingTaskModalOpen}
                    onCancel={() =>
                        liveTrackingData.setCreateOngoingTaskModalOpen(false)
                    }
                />
            </div>
        </LiveTrackingDataContext.Provider>
    );
};

export default LiveTracking;
