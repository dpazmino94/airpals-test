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
            padding: '0 36%',
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
                            <IconButton color="default" onClick={handleClose} component="span">
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className="modal_text_container">
                            <h2 id="transition-modal-title">{modalTitle}</h2>
                            {
                                modalMessage.map((value, index) => {
                                    return(<p key={index} id="transition-modal-description">{value}</p>) 
                                })
                            }
                            <div className="modal_button" onClick={handleClose} >UNDERSTOOD</div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}




export default ModalZipCode;
