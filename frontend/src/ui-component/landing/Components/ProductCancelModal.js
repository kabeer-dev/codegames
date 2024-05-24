import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/system/Unstable_Grid/Grid';
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
export default function ProductCancelModal({ notFoundedIds, setProductModalOpen, setLoading, heading }) {
    const [open, setOpen] = React.useState(true);
    return (
        <div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h2" sx={{ textAlign: 'center', py: 1.5 }}>
                        {heading}
                    </Typography>
                    <Box sx={{ borderBottom: 1, color: 'lightgray' }} />
                    <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}></Grid>
                    <ol>
                        {notFoundedIds.map((notFoundedId) => (
                            <>
                                <li>
                                    <Typography variant="h4" id="modal-modal-description" sx={{ mt: 2 }}>
                                        {notFoundedId}
                                    </Typography>
                                </li>
                            </>
                        ))}
                    </ol>
                    <Box sx={{ borderBottom: 1, margin: '18px 0', color: 'lightgray' }} />
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: 'lightGray',
                                padding: '5px 30px',
                                color: 'black'
                            }}
                            onClick={() => {
                                setLoading(false);
                                setProductModalOpen(false);
                            }}
                        >
                            Ok
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
