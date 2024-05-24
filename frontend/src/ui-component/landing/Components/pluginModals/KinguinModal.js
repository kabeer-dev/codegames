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
export default function KinguinModal({
    kinguinOpen,
    setKinguinOpen,
    pluginName,
    modalLoading,
    setModalLoading,
    kinguinPluginData,
    check,
    setCheck
}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        _id: kinguinPluginData ? kinguinPluginData._id : '',
        name: kinguinPluginData ? kinguinPluginData.name : '',
        KINGUIN_API_URL: kinguinPluginData ? kinguinPluginData.KINGUIN_API_URL : '',
        KINGUIN_API_KEY: kinguinPluginData ? kinguinPluginData.KINGUIN_API_KEY : ''
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
        const response = await myAxios.post('/admin/update-kinguin-plugin', formData).catch((error) => {
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
            setKinguinOpen(false);
            setCheck(!check);
        }
    };
    return (
        <Grid>
            <Modal open={kinguinOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                                            label="Kinguin Api Url"
                                            value={formData.KINGUIN_API_URL}
                                            name="KINGUIN_API_URL"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.KINGUIN_API_URL}</Typography>)}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Kinguin Api Key"
                                            value={formData.KINGUIN_API_KEY}
                                            name="KINGUIN_API_KEY"
                                            variant="outlined"
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    {errors &&
                                        errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.KINGUIN_API_KEY}</Typography>)}
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
                                onClick={() => setKinguinOpen(false)}
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
