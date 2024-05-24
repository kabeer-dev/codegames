import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress, FormControl, TextField, useTheme, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import ModeIcon from '@mui/icons-material/Mode';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
import CloseIcon from '@mui/icons-material/Close';
import { SmartphoneOutlined } from '@mui/icons-material';

export default function Commission() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [commission, setCommission] = useState();
    const [formData, setFormData] = useState({ commission: 0 });
    const [editable, setEditable] = useState(false);
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        const getCommission = async () => {
            const response = await myAxios.get('/admin/get-commission');
            if(response && response.status === 200){
                if(response.data.data.results.length > 0){
                    setCommission(response.data.data.results[0])
                }else{
                    setCommission({name: 'Basic', commission: 0})
                }
                
                setLoading(false)
            }
        }
        getCommission()
    }, [editable]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        setLoading(true)
        const data = {
            _id: commission._id,
            commission: formData.commission
        }
        const response = await myAxios.post('/admin/update-commission', data).catch((error) => {
            if (error.response) {
                console.error('Error Response:', error.response);
                setLoading(false)
                if (error.response.status === 422) {
                    const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                        [validationError.field]: validationError.message
                    }));

                    setErrors(newValidationErrors)
                    setLoading(false)
                }
            } else {
                console.error('Error:', error.message);
                setLoading(false)
            }
        });
        if (response && response.status === 200) {
            setLoading(false);
            setEditable(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Commission Updated Successfully',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            )
         
        }

    }


    return commission &&(
        <MainCard content={false} title="Commission">
            {/* {!loading ?
                ( */}
            <>
                <Grid sx={{ p: 2.5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 18 }}>Basic Commission is: <span style={{ color: theme.palette.success.main, fontWeight: 'bolder' }}>{commission.commission ? commission.commission : 0} %</span></Typography>
                        </Grid>

                        {!editable ?
                            (
                                <Grid item xs={3}>
                                    <ModeIcon sx={{ color: theme.palette.success.main, cursor: 'pointer' }} onClick={() => setEditable(true)} />
                                </Grid>
                            ) :
                            (
                                <>
                                    <Grid item xs={3}>
                                        <FormControl fullWidth>
                                            <TextField id="outlined-basic" type='number' label="Commission" name='commission' variant="outlined"
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        {errors && errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.commission}</Typography>
                                        ))}
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button fullWidth type="submit" variant="contained" disabled={loading ? true : false} sx={{ backgroundColor: '#00ee34', ":hover": { backgroundColor: '#00ee34' } }} onClick={handleSubmit} >
                                            {loading ?
                                                <CircularProgress sx={{ color: 'gray' }} size={24} />
                                                :
                                                'Save Commission'
                                            }
                                        </Button>
                                    </Grid>
                                    <Grid item xs={0.5} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button fullWidth type="submit" variant="outlined"  sx={{ borderColor: 'gray', color: 'gray', ":hover": {borderColor: 'gray'}}} onClick={() => setEditable(false)} >
                                            <CloseIcon/>
                                        </Button>
                                    </Grid>
                                </>
                            )
                        }

                    </Grid>
                </Grid>
            </>
            {/* )
                : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )
            } */}
        </MainCard>
    );
}
