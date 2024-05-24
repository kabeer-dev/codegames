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
export default function WoopkassaModal({
    woopkassaOpen,
    setWoopkassaOpen,
    pluginName,
    modalLoading,
    setModalLoading,
    woopkassaPluginData,
    check,
    setCheck
}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        _id: woopkassaPluginData ? woopkassaPluginData._id : '',
        name: woopkassaPluginData ? woopkassaPluginData.name : '',
        WOOPKASSA_API_URL: woopkassaPluginData ? woopkassaPluginData.WOOPKASSA_API_URL : '',
        WOOPKASSA_LOGIN: woopkassaPluginData ? woopkassaPluginData.WOOPKASSA_LOGIN : '',
        WOOPKASSA_PASSWORD: woopkassaPluginData ? woopkassaPluginData.WOOPKASSA_PASSWORD : ''
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
        const response = await myAxios.post('/admin/update-woopkassa-plugin', formData).catch((error) => {
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
            setWoopkassaOpen(false);
            setCheck(!check);
        }
    };
    return (
        <Grid>
            <Modal open={woopkassaOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                                            label="Woopkassa Api Url"
                                            value={formData.WOOPKASSA_API_URL}
                                            name="WOOPKASSA_API_URL"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.WOOPKASSA_API_URL}</Typography>
                                        ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Woopkassa Login"
                                            value={formData.WOOPKASSA_LOGIN}
                                            name="WOOPKASSA_LOGIN"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.WOOPKASSA_LOGIN}</Typography>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Woopkassa Password"
                                            value={formData.WOOPKASSA_PASSWORD}
                                            name="WOOPKASSA_PASSWORD"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.WOOPKASSA_PASSWORD}</Typography>
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
                                onClick={() => setWoopkassaOpen(false)}
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
