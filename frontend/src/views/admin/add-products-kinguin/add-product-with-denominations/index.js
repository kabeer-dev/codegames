import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    TextField,
    Tooltip,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Autocomplete,
    Checkbox,
    Typography,
    CircularProgress,
    Icon,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import { CloseBtn } from 'ui-component/landing/constants/style';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/system';
import AWS from 'aws-config';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';

const columns = [
    { id: '#', label: '#', minWidth: 100 },
    { id: 'productid', label: 'Product Id', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 }
];

const AddProductWithDenominations = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [dropdownItems, setDropdownItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bannerImages: '',
        image: '',
        product: []
    });
    const [product, setProduct] = useState();
    const [parentAdd, setParentAdd] = useState(false);
    const [childAdd, setChildAdd] = useState(false);
    const [denominationShow, setDenominationShow] = useState(true);
    const [showProductsData, setShowProductsData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [bannerImages, setBannerImages] = useState([]);
    const [parentData, setParentData] = useState();
    const [childData, setChildData] = useState([]);
    const [optionsData, setOptionsData] = useState({ options: [] });
    const [isCommission, setIsCommission] = useState(true);
    const [final, setFinal] = useState(true);

    useEffect(() => {
        const getDropdownItems = async () => {
            const response = await myAxios.get('/admin/get-dropdown-items').catch((error) => {
                console.error('Error:', error.message);
            });
            if (response && response.status === 200) {
                // const filteredResults = response.data.data.results.filter(element => element.singleProduct === true);
                setDropdownItems(response.data.data.results);
            }
        };
        getDropdownItems();
    }, [final]);

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

    const handleAutocompleteChange = (e, value) => {
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setOptionsData({
            options: value
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
        setProduct({
            ...product,
            commission: '',
            customPrice: ''
        });
    };
    const ImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setImage(webpFiles[0]);
        }
    };
    const BannnerImagesChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setBannerImages(webpFiles);
        }
    };
    const handleDeleteImage = () => {
        setLoading(true);
        setImage('');
        setLoading(false);
    };
    const handleBannerDeleteImage = (indexToDelete) => {
        setLoading(true);
        const filterImages = bannerImages.filter((_, index) => index !== indexToDelete);
        setBannerImages(filterImages);
        setLoading(false);
    };

    const handlePlus = () => {
        setProduct({ productId: '', customPrice: '' });
        setDenominationShow(false);
    };

    const handleParentSubmit = async (event) => {
        setErrors([]);
        event.preventDefault();

        setLoading(true);

        if (!image) {
            setErrors([{ image: 'No Image Selected' }]);
            setLoading(false);
            return;
        }
        if (!bannerImages.length > 0) {
            setErrors([{ bannerImage: 'No Image Selected' }]);
            setLoading(false);
            return;
        }
        if (!formData.name) {
            setErrors([{ name: 'Name is required' }]);
            setLoading(false);
            return;
        }
        if (!formData.description) {
            setErrors([{ description: 'Description is required' }]);
            setLoading(false);
            return;
        }
        //s3
        const s3 = new AWS.S3();
        const promises = bannerImages.map(async (file) => {
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
                Key: `uploads/${image.name}`,
                Body: image
            };
            const s3 = new AWS.S3();
            s3.upload(params, async (err, upload_image) => {
                if (err) {
                    setLoading(false);
                    console.error('Error uploading to S3', err);
                } else {
                    const data = {
                        name: formData.name,
                        description: formData.description,
                        image: upload_image.Location,
                        bannerImages: uploadResults,
                        product: formData.product
                    };
                    setParentData(data);
                    setParentAdd(true);
                    setLoading(false);
                }
            });
        } catch (err) {
            console.error('Error uploading multiple files', err);
            throw err; // Handle error as needed
        }
    };

    const handleSubmit = async (event) => {
        setErrors([]);
        event.preventDefault();
        setLoading(true);
        if (!product.productId) {
            setErrors([{ productId: 'Product Id is required' }]);
            setLoading(false);
            return;
        }
        if (!product.commission && !product.customPrice) {
            setErrors([{ price: `${isCommission ? 'Commission' : 'Custom Price'} is required` }]);
            setLoading(false);
            return;
        }
        const foundProduct = showProductsData.find((showProduct) => showProduct.productId === product.productId);
        if (foundProduct) {
            setErrors([{ productId: 'Product is Already Added' }]);
            setLoading(false);
            return;
        }

        const response = await myAxios.post('/admin/get-kinguin-single-product', { productId: product.productId }).catch((error) => {
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
            setChildData([
                ...childData,
                {
                    _id: response.data.data._id,
                    productId: product.productId,
                    commission: product.commission,
                    customPrice: product.customPrice
                }
            ]);
            setDenominationShow(true);
            setChildAdd(true);
            setShowProductsData([...showProductsData, product]);
            setIsCommission(true);
            setProduct('');
            setLoading(false);
            // navigate('/admin/fast-categories')
        }
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        if (!optionsData.options.length > 0) {
            setErrors([{ options: 'Atleast One option is required' }]);
            setLoading(false);
            return;
        }
        // const newArray = childData.map((obj) => obj._id);
        const newArray = childData.map(obj => ({
            product: obj._id,       // Map `_id` to `product` property
            commission: obj.commission, // Map `commission` directly
            customPrice: obj.customPrice // Map `customPrice` directly
        }));
        const data = {
            name: parentData.name,
            description: parentData.description,
            thumnailImage: parentData.image,
            coverImages: parentData.bannerImages,
            singleProduct: false,
            products: newArray
        };
        const response = await myAxios
            .post('/admin/add-kinguin-denomination-products-detail', { data: data, childData: childData, options: optionsData.options })
            .catch((error) => {
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
            setParentData('');
            setFormData({ name: '', description: '', bannerImages: '', image: '', product: [] });
            setImage('');
            setBannerImages([]);
            setParentAdd(false);
            setChildData([]);
            setDenominationShow(true);
            setChildAdd(false);
            setShowProductsData([]);
            setIsCommission(true);
            setProduct('');
            setOptionsData({ options: [] })
            setFinal(!final);
            setLoading(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Products Added Successfully',
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
        <>
            <MainCard title="Add Parent Details">
                <form onSubmit={handleParentSubmit} style={{ width: '100%' }}>
                    <Grid container>
                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        type="text"
                                        disabled={parentAdd}
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.name}</Typography>)}
                            </Grid>

                            <Grid item sm={8} xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        disabled={parentAdd}
                                        type="text"
                                        label="Description"
                                        name="description"
                                        variant="outlined"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.description}</Typography>)}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item sm={4} xs={12} sx={{ mt: image && 2 }}>
                                {image && (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '150px',
                                            backgroundImage: `url(${URL.createObjectURL(image)})`, // Set background image
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {!parentAdd ? (
                                            <Tooltip title="Remove" placement="top">
                                                <Icon
                                                    onClick={() => {
                                                        handleDeleteImage();
                                                    }}
                                                    component={CloseIcon}
                                                    sx={{
                                                        ...CloseBtn,
                                                        color: theme.palette.error
                                                    }}
                                                />
                                            </Tooltip>
                                        ) : (
                                            ''
                                        )}
                                    </Box>
                                )}
                            </Grid>

                            <Grid item sm={8} xs={12} sx={{ mt: bannerImages && { sm: 2, xs: 1 } }}>
                                <Grid container spacing={2} sx={{ display: 'flex' }}>
                                    {bannerImages.map((bannerImage, index) => (
                                        <Grid item md={2} sm={3} xs={6}>
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: '100%',
                                                    height: '75px',
                                                    backgroundImage: `url(${URL.createObjectURL(bannerImage)})`, // Set background image
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {!parentAdd ? (
                                                    <Tooltip title="Remove" placement="top">
                                                        <Icon
                                                            onClick={() => {
                                                                handleBannerDeleteImage(index);
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
                                                ) : (
                                                    ''
                                                )}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ display: 'flex', mt: { sm: 2, xs: 0.5 } }}>
                            <Grid item md={4} sm={4} xs={12}>
                                {!image ? (
                                    <FormControl fullWidth>
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/jpg, image/png, image/webp"
                                            name="image"
                                            onChange={ImageChange}
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
                                            !formData.image &&
                                            errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.image}</Typography>)}
                                    </FormControl>
                                ) : (
                                    ''
                                )}
                            </Grid>

                            <Grid item md={4} sm={5} xs={12}>
                                {!bannerImages.length > 0 ? (
                                    <FormControl fullWidth>
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/jpg, image/png, image/webp"
                                            name="bannerImage"
                                            onChange={BannnerImagesChange}
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
                                            !formData.image &&
                                            errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.bannerImage}</Typography>)}
                                    </FormControl>
                                ) : (
                                    ''
                                )}
                            </Grid>

                            <Grid item md={4} sm={3} xs={12}>
                                {!parentAdd ? (
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
                                                {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Save'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    ''
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>

            <MainCard
                title="Add Denominations"
                sx={{ mt: 5 }}
                secondary={
                    denominationShow && showProductsData.length <= 9 ? (
                        <Button
                            disabled={!parentAdd}
                            className="addBtn"
                            sx={{ backgroundColor: !parentAdd ? 'lightGray' : '#00ee34', ':hover': { backgroundColor: '#00ee34' } }}
                        >
                            <AddIcon style={{ color: 'white' }} onClick={() => handlePlus()} />
                        </Button>
                    ) : (
                        ''
                    )
                }
            >
                {showProductsData.length > 0 ? (
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            sx={{ py: 3, textAlign: 'center', fontWeight: 'bold !important' }}
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showProductsData.map((row, index) => (
                                    <>
                                        <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{row.productId}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={row.commission !== '' ? 'Commission' : 'Custom Price'}
                                                    sx={{
                                                        background: theme.palette.success.light,
                                                        color: theme.palette.success.dark,
                                                        fontWeight: 'bold'
                                                    }}
                                                />{' '}
                                            </TableCell>

                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {row.commission !== '' ? row.commission : row.customPrice}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    ''
                )}

                {/* {showProductsData.map((showProduct, index) => (
                    <Grid key={index} container spacing={2} sx={{ display: 'flex', mt: 0.5 }}>
                        <Grid item xs={1}>
                            {index + 1}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>product Id: {showProduct.productId}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {showProduct.commission !== '' ? (
                                <Typography>Commission: {showProduct.commission}</Typography>
                            ) : (
                                <Typography>Custom Price: {showProduct.customPrice}</Typography>
                            )}
                        </Grid>
                    </Grid>
                ))} */}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container>
                        {product ? (
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
                                            onChange={(e) => setProduct({ ...product, productId: e.target.value })}
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
                                                value={product.commission}
                                                onChange={(e) => setProduct({ ...product, commission: e.target.value, customPrice: '' })}
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
                                                value={product.customPrice}
                                                onChange={(e) => setProduct({ ...product, commission: '', customPrice: e.target.value })}
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

                        {childData.length > 1 ? (
                            <>
                                <Grid container sx={{ mt: 3 }}>
                                    <Grid item xs={12}>
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
                                        {errors &&
                                            errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.options}</Typography>)}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                                {/* <DeleteBtn /> */}
                                                <Button
                                                    onClick={() => handleFinalSubmit()}
                                                    variant="contained"
                                                    disabled={loading || !childAdd ? true : false}
                                                    sx={{
                                                        backgroundColor: !childAdd ? 'gray' : '#00ee34',
                                                        ':hover': { backgroundColor: '#00ee34' },
                                                        width: '150px'
                                                    }}
                                                >
                                                    {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Submit'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            ''
                        )}
                    </Grid>
                </form>
            </MainCard>
        </>
    );
};

export default AddProductWithDenominations;
