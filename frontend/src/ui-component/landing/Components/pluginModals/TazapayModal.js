import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, CircularProgress, FormControl, TextField } from '@mui/material';
import myAxios from 'utils/myAxios';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};
export default function TazaPayModal({
    tazapayOpen,
    setTazapayOpen,
    pluginName,
    modalLoading,
    setModalLoading,
    tazapayPluginData,
    check,
    setCheck
}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        _id: tazapayPluginData ? tazapayPluginData._id : '',
        name: tazapayPluginData ? tazapayPluginData.name : '',
        TAZAPAY_API_URL: tazapayPluginData ? tazapayPluginData.TAZAPAY_API_URL : '',
        TAZAPAY_PUBLIC_KEY: tazapayPluginData ? tazapayPluginData.TAZAPAY_PUBLIC_KEY : '',
        TAZAPAY_API_KEY: tazapayPluginData ? tazapayPluginData.TAZAPAY_API_KEY : '',
        TAZAPAY_API_SECRET_KEY: tazapayPluginData ? tazapayPluginData.TAZAPAY_API_SECRET_KEY : '',
        TAZAPAY_BASE64_KEY: tazapayPluginData ? tazapayPluginData.TAZAPAY_BASE64_KEY : ''
    });
    const [errors, setErrors] = React.useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async () => {
        setErrors([]);
        setModalLoading(true);
        const response = await myAxios.post('/admin/update-TAZAPAY-plugin', formData).catch((error) => {
            if (error.response) {
                console.error('Error Response:', error.response);
                setModalLoading(false);
                if (error.response.status === 422) {
                    const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                        [validationError.field]: validationError.message
                    }));
                    setErrors(newValidationErrors);
                    setModalLoading(false);
                }
            } else {
                console.error('Error:', error.message);
                setModalLoading(false);
            }
        });
        if (response && response.status === 200) {
            setModalLoading(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Plugin Updated Successfully',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            setTazapayOpen(false);
            setCheck(!check);
        }
    };
    return (
        <Grid>
            <Modal open={tazapayOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3">{pluginName}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="TazaPAY Api Url"
                                            value={formData.TAZAPAY_API_URL}
                                            name="TAZAPAY_API_URL"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.TAZAPAY_API_URL}</Typography>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="TazaPAY Public Key"
                                            value={formData.TAZAPAY_PUBLIC_KEY}
                                            name="TAZAPAY_PUBLIC_KEY"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.TAZAPAY_PUBLIC_KEY}</Typography>
                                        ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="TazaPAY Api Key"
                                            value={formData.TAZAPAY_API_KEY}
                                            name="TAZAPAY_API_KEY"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.TAZAPAY_API_KEY}</Typography>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="TazaPAY Api Secret Key"
                                            value={formData.TAZAPAY_API_SECRET_KEY}
                                            name="TAZAPAY_API_SECRET_KEY"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.TAZAPAY_API_SECRET_KEY}</Typography>
                                        ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="TazaPAY Base64 Key"
                                            value={formData.TAZAPAY_BASE64_KEY}
                                            name="TAZAPAY_BASE64_KEY"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.TAZAPAY_BASE64_KEY}</Typography>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'lightGray',
                                    ':hover': { backgroundColor: 'lightGray' },
                                    mr: 1,
                                    color: 'black'
                                }}
                                onClick={() => setTazapayOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: modalLoading ? 'gray' : '#00ee34',
                                    color: 'white',
                                    ':hover': { backgroundColor: '#00ee34' }
                                }}
                                disabled={modalLoading}
                                onClick={handleSubmit}
                            >
                                {modalLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Save'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    );
}
