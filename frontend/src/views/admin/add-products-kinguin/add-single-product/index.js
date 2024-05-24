import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    useTheme,
    Grid,
    FormControl,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Autocomplete,
    Checkbox,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';

const AddSingleProduct = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [dropdownItems, setDropdownItems] = useState([]);
    const [_id, set_Id] = useState('');
    const [errors, setErrors] = useState([]);
    const [productLoading, setProductLoading] = useState(false);
    const [productId, setProductId] = useState('');
    const [productChecked, setProductChecked] = useState(false);

    const [formData, setFormData] = useState({
        commission: '',
        customPrice: '',
        options: []
    });
    const [isCommission, setIsCommission] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDropdownItems = async () => {
            const response = await myAxios.get('/admin/get-dropdown-items').catch((error) => {
                console.error('Error:', error.message);
            });
            if (response && response.status === 200) {
                const filteredResults = response.data.data.results.filter((element) => element.singleProduct === true);
                setDropdownItems(filteredResults);
            }
        };
        getDropdownItems();
    }, []);

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
    const handlePriceModuleChange = (e) => {
        const { name, value } = e.target;
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        if (value === 'commission') {
            setIsCommission(true);
        } else {
            setIsCommission(false);
        }
        setFormData({
            ...formData,
            commission: '',
            customPrice: ''
        });
    };
    const handleAutocompleteChange = (e, value) => {
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setFormData({
            ...formData,
            options: value
        });
    };

    const handleProductSubmit = async () => {
        setErrors([]);
        setProductLoading(true);
        const response = await myAxios.post('/admin/get-kinguin-single-product', { productId: productId }).catch((error) => {
            if (error.response) {
                setErrors([{ productId: error.response.data.message }]);
                console.error('Error Response:', error.response);
                setProductLoading(false);
                if (error.response.status === 422) {
                    const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                        [validationError.field]: validationError.message
                    }));
                    setErrors(newValidationErrors);
                    setProductLoading(false);
                }
            } else {
                console.error('Error:', error.message);
                setProductLoading(false);
            }
        });
        if (response && response.status === 200) {
            set_Id(response.data.data._id);
            setProductChecked(true);
            setProductLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors([]);
        setLoading(true);
        if (!formData.commission && !formData.customPrice) {
            setErrors([{ price: `${isCommission ? 'Commission' : 'Custom Price'} is required` }]);
            setLoading(false);
            return;
        }
        const response = await myAxios.post('/admin/add-kinguin-single-product-detail', formData, { params: { _id } }).catch((error) => {
            if (error.response) {
                console.error('Error Response:', error.response);
                setLoading(false);
                if (error.response.status === 422) {
                    const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                        [validationError.field]: validationError.message
                    }));
                    setErrors(newValidationErrors);
                    setLoading(false);
                }
            } else {
                console.error('Error:', error.message);
                setLoading(false);
            }
        });
        if (response && response.status === 200) {
            setLoading(false);
            setIsCommission(true);
            setProductChecked(false);
            setProductId('');
            setFormData({
                commission: '',
                customPrice: '',
                options: []
            });
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Product Added Successfully',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <MainCard content={false} title="Add Single Product">
            <Grid container>
                <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="Product Id"
                                value={productId}
                                variant="outlined"
                                name="productId"
                                disabled={productChecked}
                                onChange={(e) => {
                                    setErrors([]);
                                    setProductId(e.target.value);
                                }}
                            />
                        </FormControl>
                        {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.productId}</Typography>)}
                    </Grid>
                    {!productChecked ? (
                        <Grid item sm={2} xs={12} sx={{ display: { sm: 'block', xs: 'flex' }, justifyContent: { sm: 'start', xs: 'end' } }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={productLoading ? true : false}
                                onClick={handleProductSubmit}
                                sx={{
                                    backgroundColor: '#00ee34',
                                    ':hover': { backgroundColor: '#00ee34' },
                                    px: 2,
                                    py: { sm: 1, xs: 0.7 },
                                    fontSize: 16
                                }}
                            >
                                {productLoading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Submit'}
                            </Button>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>

                <Grid container sx={{ mt: 3, px: 2, mb: 3 }}>
                    {productChecked ? (
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container sx={{ display: 'flex', justifyContent: ' center' }}>
                                <Typography variant="h3" sx={{ color: '#848ca4' }}>
                                    Add Detail
                                </Typography>
                            </Grid>
                            <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center', my: { sm: 0.7, xs: 0 } }}>
                                <Grid item xl={1.5} lg={2.5} sm={3} xs={12}>
                                    <FormControl>
                                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="commission"
                                            name="radio-buttons-group"
                                            onChange={handlePriceModuleChange}
                                            row
                                        >
                                            <FormControlLabel
                                                value="commission"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: theme.palette.success.main
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Commission"
                                            />
                                            <FormControlLabel
                                                value="customPrice"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: theme.palette.success.main
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Custom Price"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xl={2} lg={2} sm={3} xs={12} sx={{ pt: { sm: '8px !important', xs: '3px !important' } }}>
                                    {isCommission ? (
                                        <>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Commssion"
                                                    value={formData.commission}
                                                    variant="outlined"
                                                    name="commission"
                                                    type="number"
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            {errors &&
                                                errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.price}</Typography>)}
                                        </>
                                    ) : (
                                        <>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Custom Price"
                                                    value={formData.customPrice}
                                                    variant="outlined"
                                                    name="customPrice"
                                                    type="number"
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            {errors &&
                                                errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.price}</Typography>)}
                                        </>
                                    )}
                                </Grid>
                                <Grid item xl={8.5} lg={7.5} sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            multiple
                                            id="dropdown-list"
                                            options={dropdownItems}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.displayName}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props} key={option._id}>
                                                    <Checkbox
                                                        name="options"
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.displayName}
                                                </li>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Select Options" placeholder="Product Options" />
                                            )}
                                            onChange={handleAutocompleteChange}
                                            value={formData.options}
                                        />
                                    </FormControl>
                                    {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.options}</Typography>)}
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', pt: { sm: 0.4, xs: 1 } }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        style={{ background: !loading ? theme.palette.success.main : 'lightgray' }}
                                        sx={{ width: '150px' }}
                                    >
                                        {!loading ? 'Submit' : <CircularProgress sx={{ color: 'white' }} size={24} />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    ) : (
                        ''
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AddSingleProduct;
