import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { UserDataContext } from '../../../../context/UserDataContext';
import DataTable, {
    StyledTableCell,
} from '../../../common-components/DataTable';
import NoDataMessage from '../../../common-components/NoDataMessage';
import { UserEntity } from '../../../../model/UserDataModel';
import UserTableRow from './UserTableRow';

const UserTable = () => {
    const { userTableData, setPageNumber } = useContext(UserDataContext);
    const { userList, pageNumber, pageSize, totalElements } = userTableData;

    const onChangePage = (event: any, page: number) => {
        setPageNumber(page);
    };

    const headerRow = (
        <TableRow>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">
                Preferred Working Hour
            </StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
        </TableRow>
    );

    const dataRow = (
        <TableBody>
            {userList.map((row: UserEntity) => (
                <UserTableRow key={row.email} {...row} />
            ))}
        </TableBody>
    );

    return (
        <div>
            {userList.length > 0 ? (
                <DataTable
                    title="user table"
                    headerRow={headerRow}
                    dataRow={dataRow}
                    totalElements={totalElements}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    onChangePage={onChangePage}
                    size="small"
                />
            ) : (
                <NoDataMessage />
            )}
        </div>
    );
};

export default UserTable;
