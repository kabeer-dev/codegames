import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, CircularProgress } from '@mui/material';
import Cancle from 'assets/images/landing/Cencal.png';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};
export default function DeleteModal({ open, handleOpen, handleClose, moduleName, handleDelete, index, id, modalLoading, setModalLoading }) {
    return (
        <div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h2" sx={{ textAlign: 'center', py: 1.5 }}>
                        Delete {moduleName}
                    </Typography>
                    <Box sx={{ borderBottom: 1, color: 'lightgray' }} />
                    <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <img src={Cancle} alt="successfully-img" width={60} />
                    </Grid>
                    <Typography variant="h4" id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center', padding: '0 55px' }}>
                        Are you sure you want to delete this {moduleName}?
                    </Typography>
                    <Box sx={{ borderBottom: 1, margin: '18px 0', color: 'lightgray' }} />
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: 'lightGray',
                                padding: '5px 30px',
                                color: 'black'
                            }}
                            onClick={() => handleClose()}
                        >
                            No
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: modalLoading ? 'gray' : '#fb4b4b',
                                padding: '8px 40px',
                                color: 'white'
                            }}
                            disabled={modalLoading}
                            onClick={() => {
                                setModalLoading(true);
                                handleDelete(id, index);
                            }}
                        >
                            {modalLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Yes'}
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
