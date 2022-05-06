import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Modal: FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    body,
    modalActions,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{ overflow: 'visible', top: '30px' }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{body}</DialogContent>
            <DialogActions>{modalActions}</DialogActions>
        </Dialog>
    );
};

export default Modal;

export type ModalProps = {
    title?: JSX.Element;
    isOpen: boolean;
    onClose: any;
    body?: JSX.Element;
    modalActions?: JSX.Element;
};
