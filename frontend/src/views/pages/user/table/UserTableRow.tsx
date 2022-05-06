import { TableCell, TableRow, Grid, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import UserDeleteModal from '../modals/delete/UserDeleteModal';
import { UserEntity } from '../../../../model/UserDataModel';
import UserUpdateModal from '../modals/update/UserUpdateModal';
import { UserRoleSuffix } from '../../../../utils/MiscUtil';

const UserTableRow = (userEntity: UserEntity) => {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
        useState<boolean>(false);
    const [updateConfirmationOpen, setUpdateConfirmationOpen] =
        useState<boolean>(false);

    useEffect(() => {
        return () => {
            setDeleteConfirmationOpen(false);
            setUpdateConfirmationOpen(false);
        };
    }, []);

    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
            }}
        >
            <TableCell component="th" scope="row" align="center">
                {userEntity.email}
            </TableCell>
            <TableCell align="center">
                {UserRoleSuffix(userEntity.role || '')}
            </TableCell>
            <TableCell align="center">
                {userEntity.preferredWorkingHour}
            </TableCell>
            <TableCell align="center">
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => setUpdateConfirmationOpen(true)}
                                aria-label="edit"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => setDeleteConfirmationOpen(true)}
                                aria-label="delete"
                            >
                                <DeleteForeverIcon sx={{ fill: 'red' }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </TableCell>

            <UserDeleteModal
                isOpen={deleteConfirmationOpen}
                onCancel={() => setDeleteConfirmationOpen(false)}
                userEntity={userEntity}
            />
            <UserUpdateModal
                isOpen={updateConfirmationOpen}
                onCancel={() => setUpdateConfirmationOpen(false)}
                userEntity={userEntity}
            />
        </TableRow>
    );
};

export default UserTableRow;

export type UserTableRowProps = {
    userEntity: UserEntity;
};
