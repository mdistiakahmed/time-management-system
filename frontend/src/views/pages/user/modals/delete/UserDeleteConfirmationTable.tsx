import { UserEntity } from '../../../../../model/UserDataModel';
import { TableBody, TableCell, TableRow } from '@mui/material';
import DataTable from '../../../../common-components/DataTable';

const UserDeleteConfirmationTable = (userEntity: UserEntity) => {
    const headerRow = (
        <TableRow>
            <TableCell>email</TableCell>
            <TableCell>role</TableCell>
        </TableRow>
    );
    const dataRow = (
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                    {userEntity.email}
                </TableCell>
                <TableCell>{userEntity.role}</TableCell>
            </TableRow>
        </TableBody>
    );
    return (
        <DataTable
            title="user delete task confirmation table"
            headerRow={headerRow}
            dataRow={dataRow}
            supportsPagination={false}
            size={'small'}
        />
    );
};

export default UserDeleteConfirmationTable;
