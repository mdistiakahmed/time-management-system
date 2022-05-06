import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CompletedTaskTable from './CompletedTaskTable';
import { TaskSummaryEntity } from '../../../../model/TaskDataModel';
import { Fragment, useState } from 'react';
import { UiTextMessages } from '../../../../constants/UiTextMessages';

const CollapsibleTaskSummaryTableRow = (
    taskSummaryEntity: TaskSummaryEntity,
) => {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const {
        assignee,
        completionDate,
        totalDuration,
        taskCount,
        currentPreferredWorkingHour,
    } = taskSummaryEntity;
    const bgColor =
        totalDuration >= currentPreferredWorkingHour ? '#c6ecc6' : '#f4a3a3';
    return (
        <Fragment>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    backgroundColor: bgColor,
                }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setCollapseOpen(!collapseOpen)}
                    >
                        {collapseOpen ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                    {completionDate}
                </TableCell>
                <TableCell align="right">{assignee}</TableCell>
                <TableCell align="right">{totalDuration}</TableCell>
                <TableCell align="right">
                    {currentPreferredWorkingHour}
                </TableCell>
                <TableCell align="right">{taskCount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                {
                                    UiTextMessages.historyPageMessages
                                        .collapseExpandTitle
                                }
                            </Typography>
                            <CompletedTaskTable
                                assignee={assignee}
                                completionDate={completionDate}
                                taskCount={taskCount}
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default CollapsibleTaskSummaryTableRow;
