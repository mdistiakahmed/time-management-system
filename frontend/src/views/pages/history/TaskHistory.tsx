import { Button } from '@mui/material';
import TableContainer from '../../common-components/TableContainer';
import Topbar from '../../common-components/Topbar';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { TaskHistoryDataContext } from '../../../context/TaskHistoryDataContext';
import useTaskHistoryData from './useTaskHistoryData';
import CollapsibleTaskSummaryTable from './table/CollapsibleTaskSummaryTable';
import TaskCreateModal from './modals/create/TaskCreateModal';
import TaskFilterByDateModal from './modals/filter/TaskFilterByDateModal';
import { formatDate } from '../../../utils/DateUtil';
import ReactDOMServer from 'react-dom/server';
import Report from './Report';
import { TasksTableData, TaskStatus } from '../../../model/TaskDataModel';
import { EXPORT_PAGE_SIZE } from '../../../constants/GeneralConstants';
import { buildHtmlFile } from '../../../utils/ReportExportUtil';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { buttonStyles } from '../../../styles/ButtonStyle';

const TaskHistory = () => {
    const taskLogic = useTaskHistoryData();
    const dateRangeString =
        formatDate(taskLogic.dateRangeFilter.startDate) +
        '~' +
        formatDate(taskLogic.dateRangeFilter.endDate);

    const exportData = () => {
        taskLogic.setIsExportButtonDisabled(true);
        taskLogic.taskService
            .getTasks({
                startDate: formatDate(taskLogic.dateRangeFilter.startDate),
                endDate: formatDate(taskLogic.dateRangeFilter.endDate),
                assignee: taskLogic.assignee,
                status: TaskStatus.COMPLETED,
                pageNumber: 0,
                pageSize: EXPORT_PAGE_SIZE,
            })
            .then(async (res: TasksTableData) => {
                const html = ReactDOMServer.renderToStaticMarkup(
                    <Report {...res} />,
                );
                const link = document.createElement('a');
                link.href = buildHtmlFile(html);
                link.download = `${dateRangeString}_data.html`;

                link.click();
            })
            .finally(() => {
                taskLogic.setIsExportButtonDisabled(false);
            });
    };

    const leftButtons = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
                variant="contained"
                sx={buttonStyles}
                startIcon={<AddIcon />}
                onClick={() => taskLogic.setCreateModalOpen(true)}
            >
                {UiTextMessages.historyPageMessages.addTaskButtonText}
            </Button>
            <Button
                variant="contained"
                sx={buttonStyles}
                startIcon={<CalendarMonthIcon />}
                onClick={() => taskLogic.setDateFilterModalOpen(true)}
            >
                {dateRangeString}
            </Button>
        </div>
    );

    const rightButtons = (
        <div>
            <Button
                disabled={taskLogic.isExportButtonDisabled}
                variant="contained"
                sx={buttonStyles}
                startIcon={<FileDownloadOutlinedIcon />}
                onClick={exportData}
            >
                {UiTextMessages.historyPageMessages.exportButtonText}
            </Button>
        </div>
    );

    return (
        <TaskHistoryDataContext.Provider value={taskLogic}>
            <div>
                <Topbar />
                <TableContainer
                    leftButtons={leftButtons}
                    rightButtons={rightButtons}
                    table={
                        <CollapsibleTaskSummaryTable
                            tasksSummaryData={taskLogic.tasksSummaryData}
                        />
                    }
                />
                <TaskCreateModal
                    isOpen={taskLogic.createModalOpen}
                    onCancel={() => taskLogic.setCreateModalOpen(false)}
                />
                <TaskFilterByDateModal
                    isOpen={taskLogic.dateFilterModalOpen}
                    onCancel={() => taskLogic.setDateFilterModalOpen(false)}
                />
            </div>
        </TaskHistoryDataContext.Provider>
    );
};

export default TaskHistory;
