import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid } from '@mui/material';
import PaymentInvoice from '../../../views/pages/landing/payment/PaymentInvoice';
import { InvoiceModalstyle, InvoiceModalBtn } from '../constants/style';

export default function InvoiceModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>Invoice Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ background: '#101328' }}
            >
                <Box sx={InvoiceModalstyle}>
                    <Typography variant="h6" component="h2">
                        Данные заказа
                    </Typography>
                    <Divider sx={{ width: '100%', borderColor: '#303542', py: 1 }} />
                    <PaymentInvoice />
                    <Grid sx={{ pt: 2 }}>
                        <Button
                            fullWidth
                            sx={{
                                ...InvoiceModalBtn
                            }}
                        >
                            Close
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
