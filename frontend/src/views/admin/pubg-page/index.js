import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    TextField,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Tooltip,
    Checkbox,
    Typography,
    CircularProgress,
    Icon,
    Box,
    Chip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import { useTheme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductCancelModal from '../../../ui-component/landing/Components/ProductCancelModal';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { CloseBtn } from 'ui-component/landing/constants/style';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePageModal from 'ui-component/landing/Components/deletePageModal';
import { activeItem } from '../../../store/slices/menu';

const columns = [
    { id: '#', label: '#', minWidth: 100 },
    { id: 'productid', label: 'Product Id', minWidth: 100 },
    // { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'customPrice', label: 'Custom Price', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 }
];

const PubgPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const { navigationUrl } = location.state;
    const moduleName = 'PubgPage'
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const [parentData, setParentData] = useState('');
    const [thumnailImage, setThumnailImage] = useState('')
    const [coverImages, setCoverImages] = useState([])

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setParentData({
            ...parentData,
            [name]: value
        });
    };

    const handleThumnailImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setThumnailImage(webpFiles[0]);
        }
    };
    const handleCoverImagesChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setCoverImages(webpFiles);
        }
    };

    const handleDeleteParentThumnailImage = () => {
        setLoading(true);
        setParentData({
            ...parentData,
            thumnailImage: ''
        });
        setLoading(false);
    };
    const handleDeleteThumnailImage = () => {
        setLoading(true);
        setThumnailImage('');
        setLoading(false);
    };

    const handleDeleteParentCoverImages = (indexToDelete) => {
        setLoading(true);
        const filterImages = parentData.coverImages.filter((_, index) => index !== indexToDelete);
        setParentData({
            ...parentData,
            coverImages: filterImages
        });
        setLoading(false);
    };
    const handleDeleteCoverImages = (indexToDelete) => {
        setLoading(true);
        const filterImages = coverImages.filter((_, index) => index !== indexToDelete);
        setCoverImages(filterImages)
        setLoading(false);
    };

    const handleParentSubmit = async (event) => {
        setErrors([]);
        event.preventDefault();
        setLoading(true);
        if (!thumnailImage && !coverImages.length > 0) {
            const data = parentData;
            const response = await myAxios.post('/admin/update-parent-multi-with-module-name', data, { params: { moduleName: moduleName } }).catch((error) => {
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
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Parent Data Updated Successfully',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            }
        } else if (thumnailImage && !coverImages.length > 0) {
            if (!thumnailImage) {
                setErrors([{ thumnailImage: 'Logo is required' }]);
                setLoading(false);
                return;
            }
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${thumnailImage.name}`,
                Body: thumnailImage
            };
            const s3 = new AWS.S3();
            s3.upload(params, async (err, upload_image) => {
                if (err) {
                    setLoading(false);
                    console.error('Error uploading to S3', err);
                } else {
                    const data = {
                        _id: parentData._id,
                        name: parentData.name,
                        description: parentData.description,
                        thumnailImage: upload_image.Location,
                        coverImages: parentData.coverImages,
                    };
                    const response = await myAxios.post('/admin/update-parent-multi-with-module-name', data, { params: { moduleName: moduleName } }).catch((error) => {
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
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Parent Data Updated Successfully',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                    }
                }
            });
        } else if (!thumnailImage && coverImages.length > 0) {
            if (!coverImages.length > 0) {
                setErrors([{ coverImages: 'Atleast 1 Image is required' }]);
                setLoading(false);
                return;
            }
            const s3 = new AWS.S3();
            const promises = coverImages.map(async (file) => {
                const timestamp = Date.now(); // Get a unique timestamp
                const uniqueFileName = `${timestamp}_${file.name}`; // Append timestamp to the file name
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${uniqueFileName}`,
                    Body: file
                };

                try {
                    const data = await s3.upload(params).promise();
                    return data.Location;
                } catch (err) {
                    console.error('Error uploading to S3', err);
                    setLoading(false);
                    throw err;
                }
            });
            try {
                const uploadResults = await Promise.all(promises);
                const data = {
                    _id: parentData._id,
                    name: parentData.name,
                    description: parentData.description,
                    thumnailImage: parentData.thumnailImage,
                    coverImages: uploadResults,
                };
                const response = await myAxios.post('/admin/update-parent-multi-with-module-name', data, { params: { moduleName: moduleName } }).catch((error) => {
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
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Parent Data Updated Successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                }
            } catch (err) {
                console.error('Error uploading multiple files', err);
                throw err; // Handle error as needed
            }
        } else {
            if (!thumnailImage) {
                setErrors([{ thumnailImage: 'Logo is required' }]);
                setLoading(false);
                return;
            }
            if (!coverImages.length > 0) {
                setErrors([{ coverImages: 'Atleast 1 Image is required' }]);
                setLoading(false);
                return;
            }
            const s3 = new AWS.S3();
            const promises = coverImages.map(async (file) => {
                const timestamp = Date.now(); // Get a unique timestamp
                const uniqueFileName = `${timestamp}_${file.name}`; // Append timestamp to the file name
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${uniqueFileName}`,
                    Body: file
                };

                try {
                    const data = await s3.upload(params).promise();
                    return data.Location;
                } catch (err) {
                    console.error('Error uploading to S3', err);
                    setLoading(false);
                    throw err;
                }
            });
            try {
                const uploadResults = await Promise.all(promises);
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${thumnailImage.name}`,
                    Body: thumnailImage
                };
                const s3 = new AWS.S3();
                s3.upload(params, async (err, upload_image) => {
                    if (err) {
                        setLoading(false);
                        console.error('Error uploading to S3', err);
                    } else {
                        const data = {
                            _id: parentData._id,
                            name: parentData.name,
                            description: parentData.description,
                            thumnailImage: upload_image.Location,
                            coverImages: uploadResults,
                        };
                        const response = await myAxios.post('/admin/update-parent-multi-with-module-name', data, { params: { moduleName: moduleName } }).catch((error) => {
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
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Parent Data Updated Successfully',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );
                        }
                    }
                });
            } catch (err) {
                console.error('Error uploading multiple files', err);
                throw err; // Handle error as needed
            }
        }

    }

    const [denominationData, setDenominationData] = useState('')
    const [denominationAddShow, setDenominationAddShow] = useState(true)
    const [isCommission, setIsCommission] = useState(true)
    const [singleProduct, setSingleProduct] = useState('')

    const handlePlus = () => {
        setSingleProduct({ productId: '', commission: '', customPrice: '' });
        setDenominationAddShow(false);
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
        setSingleProduct({
            ...singleProduct,
            commission: '',
            customPrice: ''
        });
    };

    function calculateTotalPrice(basePrice, commissionPercentage) {
        const commissionAmount = (commissionPercentage / 100) * basePrice;
        const totalPrice = basePrice + commissionAmount;
        return totalPrice;
    }

    const deleteDnominationIndex = (indexToDelete) => {
        setLoading(true)
        const newArray = denominationData.filter((_, index) => index !== indexToDelete);
        setDenominationData(newArray)
        setLoading(false)
    }

    const handleDeleteenominationSubmit = async (event) => {
        setErrors([]);
        event.preventDefault();
        setLoading(true);

        const isProductExists = denominationData.some(data => data.product.productId === singleProduct.productId);
        if (isProductExists) {
            setErrors([{ productId: 'This product is already in Denomination' }]);
            setLoading(false);
            return;
        }
        if (isCommission && !singleProduct.commission) {
            setErrors([{ price: 'Commission is required' }]);
            setLoading(false);
            return;
        }
        if (!isCommission && !singleProduct.customPrice) {
            setErrors([{ price: 'Custom Price is required' }]);
            setLoading(false);
            return;
        }
        const response = await myAxios.post('/admin/check-kinguin-single-product', singleProduct).catch((error) => {
            if (error.response) {
                setErrors([{ productId: error.response.data.message }]);
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
            let cPrice = 0
            if (isCommission) {
                cPrice = calculateTotalPrice(response.data.data.fullProduct.price, singleProduct.commission).toFixed(2)
            } else {
                cPrice = singleProduct.customPrice
            }
            const cPriceNumber = parseFloat(cPrice)
            setDenominationData([...denominationData, { product: response.data.data.fullProduct, customPrice: cPriceNumber }])
            setIsCommission(true)
            setSingleProduct('')
            setLoading(false)
            setDenominationAddShow(true)
        }
    }

    const handleFinalSubmit = async () => {
        setLoading(true);
        const response = await myAxios.post('/admin/update-denominations-product-with-module-name', { products: denominationData }, { params: { _id: parentData._id, moduleName: moduleName } });
        if (response && response.status === 200) {
            setLoading(false);
            // navigate(navigationUrl)
        }
    }

    useEffect(() => {
        const getPubgs = async () => {
            // const response = await myAxios.post('/admin/platform-games', { platform: 'steam' });
            const response = await myAxios.get('/admin/get-products-with-module-name', { params: { moduleName: 'PubgPage' } });
            if (response.status === 200) {
                if (response.data.data.results.length > 0) {
                    setParentData(response.data.data.results[0])
                    setDenominationData(response.data.data.results[0].products)
                    setLoading(false)
                }
                setLoading(false)
            } else {
                console.error('Error fetching Games:', response.data);
                setLoading(false)
            }
        }
        getPubgs()

    }, []);

    const handleDelete = async (product_id, index) => {
        // const response = await myAxios.post('/admin/romove-platform-product', { id: product_id }, { params: { platformName: 'steam' } });
        const response = await myAxios.post('/admin/delete-Product-with-module-name', { id: product_id }, { params: { moduleName: moduleName } });
        if (response && response.status === 200) {
            dispatch(activeItem(['dashboard']));
            navigate('/admin')
        }
    }

    return (
        <>
            {!loading ? (
                parentData && denominationData ? (
                    <>
                        <MainCard title="Update Parent Data"
                            secondary={
                                <Button variant="outlined" onClick={() => { setCurrentId(parentData._id); setOpen(true) }}
                                    disabled={loading ? true : false}
                                    style={{ color: 'red', border: '1px solid', borderColor: !loading ? 'red' : 'gray', width: '200px' }}
                                >
                                    {!loading ?
                                        'Delete PUBG'
                                        :
                                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                                    }
                                </Button>
                            }
                        >
                            <form onSubmit={handleParentSubmit} style={{ width: '100%' }}>
                                <Grid container>
                                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Grid item sm={4} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="outlined-basic"
                                                    type="text"
                                                    label="Name"
                                                    name="name"
                                                    variant="outlined"
                                                    value={parentData.name}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.name}</Typography>)}
                                        </Grid>

                                        <Grid item sm={8} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="outlined-basic"
                                                    type="text"
                                                    label="Description"
                                                    name="description"
                                                    variant="outlined"
                                                    value={parentData.description}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.description}</Typography>)}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item sm={4} xs={12} sx={{ mt: parentData.thumnailImage || thumnailImage ? 2 : 0 }}>
                                        {parentData.thumnailImage || thumnailImage ? (
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: '150px',
                                                    backgroundImage: `url(${parentData.thumnailImage ? parentData.thumnailImage : URL.createObjectURL(thumnailImage)})`, // Set background image
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >

                                                <Tooltip title="Remove" placement="top">
                                                    <Icon
                                                        onClick={() => {
                                                            parentData.thumnailImage ? handleDeleteParentThumnailImage() : handleDeleteThumnailImage();
                                                        }}
                                                        component={CloseIcon}
                                                        sx={{
                                                            ...CloseBtn,
                                                            color: theme.palette.error
                                                        }}
                                                    />
                                                </Tooltip>

                                            </Box>
                                        ) : ''}
                                    </Grid>

                                    <Grid item sm={8} xs={12} sx={{ mt: parentData.coverImages.length > 0 || coverImages.length > 0 ? { sm: 2, xs: 1 } : 0 }}>
                                        <Grid container spacing={2} sx={{ display: 'flex' }}>
                                            {parentData.coverImages.length > 0 ? (
                                                parentData.coverImages.map((coverImageData, index) => (
                                                    <Grid key={index} item md={2} sm={3} xs={6}>
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: '75px',
                                                                backgroundImage: `url(${coverImageData})`, // Set background image
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >

                                                            <Tooltip title="Remove" placement="top">
                                                                <Icon
                                                                    onClick={() => {
                                                                        handleDeleteParentCoverImages(index);
                                                                    }}
                                                                    component={CloseIcon}
                                                                    sx={{
                                                                        ...CloseBtn,
                                                                        fontSize: 'medium',
                                                                        p: 0.1,
                                                                        m: 0.4,
                                                                        color: theme.palette.error
                                                                    }}
                                                                />
                                                            </Tooltip>

                                                        </Box>
                                                    </Grid>
                                                ))
                                            ) : (
                                                coverImages.map((coverImageData, index) => (
                                                    <Grid key={index} item md={2} sm={3} xs={6}>
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: '75px',
                                                                backgroundImage: `url(${URL.createObjectURL(coverImageData)})`, // Set background image
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center'
                                                            }}
                                                        >

                                                            <Tooltip title="Remove" placement="top">
                                                                <Icon
                                                                    onClick={() => {
                                                                        handleDeleteCoverImages(index);
                                                                    }}
                                                                    component={CloseIcon}
                                                                    sx={{
                                                                        ...CloseBtn,
                                                                        fontSize: 'medium',
                                                                        p: 0.1,
                                                                        m: 0.4,
                                                                        color: theme.palette.error
                                                                    }}
                                                                />
                                                            </Tooltip>

                                                        </Box>
                                                    </Grid>
                                                ))
                                            )}

                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ display: 'flex', mt: { sm: 2, xs: 0.5 } }}>
                                    <Grid item md={4} sm={4} xs={12}>
                                        {!thumnailImage && !parentData.thumnailImage ? (
                                            <FormControl fullWidth>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/jpg, image/png, image/webp"
                                                    name="image"
                                                    onChange={handleThumnailImageChange}
                                                    style={{ display: 'none' }}
                                                    id="cover-image-file"
                                                    disabled={loading}
                                                />
                                                <label htmlFor="cover-image-file">
                                                    <Button
                                                        variant="outlined"
                                                        component="span"
                                                        disabled={loading}
                                                        startIcon={<CloudUploadIcon />}
                                                        style={{
                                                            color: !loading ? theme.palette.success.main : 'gray',
                                                            border: '1px solid',
                                                            borderColor: !loading ? theme.palette.success.main : 'gray'
                                                        }}
                                                    >
                                                        Upload Logo
                                                    </Button>
                                                </label>
                                                {errors &&
                                                    !parentData.thumnailImage &&
                                                    errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.thumnailImage}</Typography>)
                                                }
                                            </FormControl>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>

                                    <Grid item md={4} sm={5} xs={12}>
                                        {!coverImages.length > 0 && !parentData.coverImages.length > 0 ? (
                                            <FormControl fullWidth>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/jpg, image/png, image/webp"
                                                    name="bannerImage"
                                                    onChange={handleCoverImagesChange}
                                                    style={{ display: 'none' }}
                                                    id="banner-image-file"
                                                    disabled={loading}
                                                    multiple
                                                />
                                                <label htmlFor="banner-image-file">
                                                    <Button
                                                        variant="outlined"
                                                        component="span"
                                                        disabled={loading}
                                                        startIcon={<CloudUploadIcon />}
                                                        style={{
                                                            color: !loading ? theme.palette.success.main : 'gray',
                                                            border: '1px solid',
                                                            borderColor: !loading ? theme.palette.success.main : 'gray'
                                                        }}
                                                        sx={{ p: { sm: '5px 15px', xs: '5px 13px' } }}
                                                    >
                                                        Upload Cover images
                                                    </Button>
                                                </label>
                                                {errors &&
                                                    !parentData.coverImages.length > 0 &&
                                                    errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.coverImages}</Typography>)
                                                }
                                            </FormControl>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>

                                    <Grid item md={4} sm={3} xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                                {/* <DeleteBtn /> */}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={loading ? true : false}
                                                    sx={{
                                                        backgroundColor: '#00ee34',
                                                        ':hover': { backgroundColor: '#00ee34' },
                                                        width: '150px'
                                                    }}
                                                >
                                                    {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Update'}
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </form>
                            <DeletePageModal open={open} handleOpen={handleOpen} handleClose={handleClose} moduleName={'PUBG Page'} handleDelete={handleDelete} currentId={currentId} modalLoading={modalLoading} setModalLoading={setModalLoading} />
                        </MainCard>

                        <MainCard title="Update Denomination Data" sx={{ mt: 5 }}
                            secondary={
                                denominationAddShow && denominationData.length <= 9 ? (
                                    <Button
                                        disabled={loading}
                                        className="addBtn"
                                        sx={{ backgroundColor: loading ? 'lightGray' : '#00ee34', ':hover': { backgroundColor: '#00ee34' } }}
                                    >
                                        <AddIcon style={{ color: 'white' }}
                                            onClick={() => handlePlus()}
                                        />
                                    </Button>
                                ) : (
                                    ''
                                )
                            }
                        >
                            {denominationData.length > 0 ? (
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={{ py: 3, textAlign: 'center', fontWeight: 'bold !important' }}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {denominationData.map((row, index) => (
                                                <TableRow key={index} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.product.productId}</TableCell>
                                                    {/* <TableCell sx={{ textAlign: 'center' }}>
                                                    <Chip
                                                        label={'Custom Price'}
                                                        sx={{
                                                            background: theme.palette.success.light,
                                                            color: theme.palette.success.dark,
                                                            fontWeight: 'bold'
                                                        }}
                                                    />{' '}
                                                </TableCell> */}

                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {row.customPrice.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Tooltip title="Delete" placement="top">
                                                            <IconButton
                                                                onClick={() => { deleteDnominationIndex(index) }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                ''
                            )}

                            <form
                                onSubmit={handleDeleteenominationSubmit}
                                style={{ width: '100%' }}>
                                <Grid container>
                                    {singleProduct ? (
                                        <Grid container spacing={2} sx={{ display: 'flex', mt: 1 }}>
                                            <Grid item xl={4} lg={4} sm={3.5} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="outlined-basic"
                                                        type="text"
                                                        label="Product Id"
                                                        name="productId"
                                                        variant="outlined"
                                                        // onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                                                        onChange={(e) => setSingleProduct({ ...singleProduct, productId: e.target.value })}
                                                    />
                                                </FormControl>
                                                {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.productId}</Typography>)}
                                            </Grid>
                                            <Grid
                                                item
                                                xl={3}
                                                lg={4}
                                                // md={5.5}
                                                sm={5.5}
                                                sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                                            >
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

                                            {isCommission ? (
                                                <Grid item xl={3} lg={2} sm={3} xs={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-basic"
                                                            type="number"
                                                            label="Commission"
                                                            name="commission"
                                                            variant="outlined"
                                                            value={singleProduct.commission}
                                                            onChange={(e) => setSingleProduct({ ...singleProduct, commission: e.target.value, customPrice: '' })}
                                                        // onChange={(e) => handleProductChange(index, 'customPrice', e.target.value)}
                                                        />
                                                    </FormControl>
                                                    {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.price}</Typography>)}
                                                </Grid>
                                            ) : (
                                                <Grid item xl={3} lg={2} sm={3} xs={12}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-basic"
                                                            type="number"
                                                            label="Custom Price"
                                                            name="customPrice"
                                                            variant="outlined"
                                                            value={singleProduct.customPrice}
                                                            onChange={(e) => setSingleProduct({ ...singleProduct, commission: '', customPrice: e.target.value })}
                                                        // onChange={(e) => handleProductChange(index, 'customPrice', e.target.value)}
                                                        />
                                                    </FormControl>
                                                    {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.price}</Typography>)}
                                                </Grid>
                                            )}

                                            <Grid
                                                item
                                                lg={1}
                                                xs={12}
                                                sx={{ display: 'flex', justifyContent: { lg: 'center', xs: 'end' }, alignItems: 'center' }}
                                            >
                                                <Button
                                                    disabled={loading ? true : false}
                                                    type="submit"
                                                    sx={{
                                                        backgroundColor: loading ? 'lightGray' : '#00ee34',
                                                        color: 'white',
                                                        ':hover': { backgroundColor: '#00ee34' }
                                                    }}
                                                >
                                                    {loading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Save'}
                                                </Button>
                                            </Grid>

                                            {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button sx={{ backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>
                                            <CloseIcon style={{ color: 'white' }} onClick={() => handleCross(index)} />
                                        </Button>
                                    </Grid> */}
                                        </Grid>
                                    ) : (
                                        ''
                                    )}


                                    {/* <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Grid item xs={12}> */}
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                            {/* <DeleteBtn /> */}
                                            <Button
                                                fullWidth
                                                onClick={() => handleFinalSubmit()}
                                                variant="contained"
                                                disabled={loading ? true : false}
                                                sx={{
                                                    backgroundColor: loading ? 'gray' : '#00ee34',
                                                    ':hover': { backgroundColor: '#00ee34' },
                                                    width: '150px'
                                                }}
                                            >
                                                {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Update'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {/* </Grid>
                            </Grid> */}


                                </Grid>
                            </form>
                        </MainCard>
                    </>
                ) : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography sx={{ fontSize: 15 }}>
                            No Record Founded
                        </Typography>
                    </Grid>
                )


            ) :
                (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )
            }
        </>
    );
};

export default PubgPage;
