import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string | string[];
}

const Modal: React.FC<GenericDialogProps> = ({
  open,
  onClose,
  className,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className={classNames(className)}
      PaperProps={{ sx: { borderRadius: '35px', padding: 3 } }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
