import {
    Paper,
    styled,
    Table,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
} from '@mui/material';

const DataTable = ({
    title,
    headerRow,
    dataRow,
    supportsPagination = true,
    totalElements = 0,
    pageSize = 0,
    pageNumber = 0,
    onChangePage = () => Promise.resolve(),
    size = 'medium',
}: DataTableProps) => {
    return (
        <Paper>
            <TableContainer>
                <Table size={size} aria-label={title}>
                    <TableHead>{headerRow}</TableHead>
                    {dataRow}
                </Table>
            </TableContainer>
            {supportsPagination && (
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[]}
                    count={totalElements}
                    rowsPerPage={pageSize}
                    page={pageNumber}
                    onPageChange={onChangePage}
                />
            )}
        </Paper>
    );
};

export default DataTable;

type DataTableProps = {
    title: string;
    headerRow: JSX.Element;
    dataRow: JSX.Element;
    supportsPagination?: boolean;
    totalElements?: number;
    pageSize?: number;
    pageNumber?: number;
    onChangePage?: (event: any, page: number) => any;
    size?: 'medium' | 'small';
};

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
    },
}));
