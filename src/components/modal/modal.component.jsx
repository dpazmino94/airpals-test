import React from 'react';
import '../modal/modal.styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const ModalZipCode = ({ open, handleClose, modalTitle, modalMessage }) => {
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();


    return (
        <div>
            {/* <button type="button" onClick={openModal}>
                react-transition-group
          </button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className='close_button_container'>
                            <IconButton color="black" onClick={handleClose} component="span">
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <h2 id="transition-modal-title">{modalTitle}</h2>
                        <p id="transition-modal-description">{modalMessage}</p>
                        <div className="modal_button">UNDERSTOOD</div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}




export default ModalZipCode;
