import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { UserEntity } from '../../../../../model/UserDataModel';
import Modal from '../../../../common-components/Modal';
import UserDeleteConfirmationTable from './UserDeleteConfirmationTable';

const UserDeleteModal = ({
    isOpen,
    onCancel,
    userEntity,
}: UserDeleteModalProps) => {
    const { deleteUser } = useContext(UserDataContext);

    const onDeleteConfirm = () => {
        deleteUser(userEntity.email).then(() => onCancel());
    };
    const title = (
        <Alert severity={'error'}>
            {UiTextMessages.userPageMessages.userDeleteConfirmationTitle}
        </Alert>
    );

    const body = <UserDeleteConfirmationTable {...userEntity} />;

    const actions = (
        <div>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onDeleteConfirm}>Delete</Button>
        </div>
    );

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onCancel}
            body={body}
            modalActions={actions}
        />
    );
};

export default UserDeleteModal;

export type UserDeleteModalProps = {
    isOpen: boolean;
    onCancel: any;
    userEntity: UserEntity;
};
