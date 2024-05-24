import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Button, Grid, TextField, FormControl, Typography, Chip, CircularProgress, useTheme, Box, Icon } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config'
import ProductCancelModal from '../../../ui-component/landing/Components/ProductCancelModal';
import { useSelector } from 'react-redux';

const EditNewsAndPromotion = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const news = location.state;
    let editNews = ''
    let fetchIds = []
    if (news) {
        editNews = news.news
        fetchIds = editNews.product.map(item => item.productId);
    }
    const allProducts = useSelector((state) => state.changeSkelton.products);

    const [formData, setFormData] = useState({
        title: editNews.title ? editNews.title : '',
        telegramUrl: editNews.telegramUrl ? editNews.telegramUrl : '',
        facebookUrl: editNews.facebookUrl ? editNews.facebookUrl : '',
        discordUrl: editNews.discordUrl ? editNews.discordUrl : '',
        description: editNews.description ? editNews.description : '',
        keyFeatures: editNews.keyFeatures ? editNews.keyFeatures : [],
        coverImage: editNews.coverImage ? editNews.coverImage : '',
        product: editNews.product ? editNews.product : []
    })
    const [featureValue, setFeatureValue] = useState('');
    const [keyFeatures, setKeyFeatures] = useState(editNews.keyFeatures ? editNews.keyFeatures : []);
    const [errors, setErrors] = useState([]);
    const [urlErrors, setUrlErrors] = useState({ telegramUrl: '', facebookUrl: '', discordUrl: '' });
    const [loading, setLoading] = useState(false);
    const [newsImage, setNewsImage] = useState('');


    const [pId, setPId] = useState('');
    const [productIds, setProductIds] = useState(fetchIds ? fetchIds : []);
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [notFoundedIds, setNotFoundedIds] = useState([]);

    const handleKeyDownProducts = (event) => {
        if (event.key === 'Enter' && pId.trim() !== '') {
            event.preventDefault();
            const trimmedProductIds = pId.trim();
            if (!productIds.includes(trimmedProductIds)) {
                setProductIds([...productIds, trimmedProductIds]);
                setPId('');
                const indexToRemove = errors.findIndex((element) => 'product' in element);
                if (indexToRemove !== -1) {
                    errors.splice(indexToRemove, 1);
                }
            }
        }
    };

    const handleProductIdDelete = (productId) => {
        setProductIds(productIds.filter((id) => id !== productId));
    };

    const handleInputChange = (event) => {
        setFeatureValue(event.target.value);
    };

    const isValidURL = (url) => {
        // Regular expression to validate URL
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telegramUrl' || name === 'facebookUrl' || name === 'discordUrl') {
            if (value === '') {
                setUrlErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            }
            else if (isValidURL(value)) {
                setUrlErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            } else {
                setUrlErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Url is Invalid'
                }));
            }
        }
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && featureValue.trim() !== '') {
            event.preventDefault();
            const trimmedFeature = featureValue.trim();
            if (!keyFeatures.includes(trimmedFeature)) {
                setKeyFeatures([...keyFeatures, trimmedFeature]);
                setFeatureValue('');
                const indexToRemove = errors.findIndex((element) => 'keyFeatures' in element);
                if (indexToRemove !== -1) {
                    errors.splice(indexToRemove, 1);
                }
            }
        }
    };

    const handleDelete = (feature) => {
        setKeyFeatures(keyFeatures.filter((item) => item !== feature));
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter((file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/webp');
            setNewsImage(webpFiles[0]);
            setErrors([{ coverImage: '' }])
        }
    };

    // const handleAutocompleteChange = (e, value) => {
    //     const indexToRemove = errors.findIndex((element) => e.target.name in element);
    //     if (indexToRemove !== -1) {
    //         errors.splice(indexToRemove, 1);
    //     }
    //     setFormData({
    //         ...formData,
    //         'product': value
    //     })
    // };

    const handleSubmit = async (event) => {
        setErrors([])
        setLoading(true)
        event.preventDefault();
        setNotFoundedIds([])
        let validIds = []
        let invalidIds = []
        for (let i = 0; i <= productIds.length - 1; i++) {
            const existingProduct = allProducts.find(product => product.productId === productIds[i]);
            if (existingProduct) {
                validIds.push(existingProduct._id)
            } else {
                invalidIds.push(productIds[i])
            }
        }
        if (!invalidIds.length > 0) {
            if (urlErrors.telegramUrl !== '' || urlErrors.facebookUrl !== '' || urlErrors.discordUrl !== '') {
                setLoading(false)
                return
            }
            if (!newsImage) {
                if (!formData.coverImage) {
                    setErrors([{ coverImage: 'No Image Selected' }])
                    setLoading(false)
                    return
                }
                const data = {
                    _id: editNews._id,
                    title: formData.title,
                    telegramUrl: formData.telegramUrl,
                    facebookUrl: formData.facebookUrl,
                    discordUrl: formData.discordUrl,
                    keyFeatures: [...keyFeatures],
                    description: formData.description,
                    coverImage: formData.coverImage,
                    product: validIds
                }

                const response = await myAxios.post('/admin/update-news', data).catch((error) => {
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
                    navigate('/admin/news-and-promotions')
                }
            } else {
                if (!newsImage) {
                    setErrors([{ coverImage: 'No Image Selected' }])
                    setLoading(false)
                    return
                }
                //s3
                const s3 = new AWS.S3();
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${newsImage.name}`,
                    Body: newsImage,
                };

                s3.upload(params, async (err, imageData) => {
                    if (err) {
                        setLoading(false)
                        console.error('Error uploading to S3', err);
                    } else {
                        const data = {
                            _id: editNews._id,
                            title: formData.title,
                            telegramUrl: formData.telegramUrl,
                            facebookUrl: formData.facebookUrl,
                            discordUrl: formData.discordUrl,
                            keyFeatures: [...keyFeatures],
                            description: formData.description,
                            coverImage: imageData.Location,
                            product: validIds
                        }

                        const response = await myAxios.post('/admin/update-news', data).catch((error) => {
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
                            navigate('/admin/news-and-promotions')
                        }
                    }
                })
            }
        } else {
            setNotFoundedIds((prev) => prev = invalidIds);
            setProductModalOpen(true)
        }

    };

    const handleCoverDeleteImage = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            coverImage: ''
        }));
    }
    const handleNewCoverDeleteImage = () => {
        setNewsImage('');
    }

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <MainCard title='Update News'>
            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* <form style={{ width: '100%' }}> */}
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="Title" name='title' value={formData.title} variant="outlined" onChange={handleChange} />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.title}</Typography>
                            ))}
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="Telegram Url" type='text' name='telegramUrl' value={formData.telegramUrl} variant="outlined" onChange={handleChange} />
                            </FormControl>

                            <Typography sx={{ color: 'red', mt: 0.5 }}>{urlErrors.telegramUrl}</Typography>

                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="Facebook Url" name='facebookUrl' value={formData.facebookUrl} variant="outlined" onChange={handleChange} />
                            </FormControl>
                            <Typography sx={{ color: 'red', mt: 0.5 }}>{urlErrors.facebookUrl}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="Discord Url" name='discordUrl' value={formData.discordUrl} variant="outlined" onChange={handleChange} />
                            </FormControl>
                            <Typography sx={{ color: 'red', mt: 0.5 }}>{urlErrors.discordUrl}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Key Features"
                                    variant="outlined"
                                    value={featureValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 10 }}>
                                    {keyFeatures.map((feature, index) => (
                                        <Chip
                                            key={index}
                                            label={feature}
                                            onDelete={() => handleDelete(feature)}
                                            deleteIcon={<CancelIcon />}
                                            style={{ marginRight: 5, marginBottom: 5 }}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.keyFeatures}</Typography>
                            ))}
                        </Grid>

                        <Grid item xs={6}>
                            {/* <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={allProducts}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.originalName ? option.originalName : option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props} key={option._id}>
                                            <Checkbox
                                                name='product'
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.originalName ? option.originalName : option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selecl Products" placeholder="Products" />
                                    )}
                                    onChange={handleAutocompleteChange}
                                    value={formData.product}
                                />
                            </FormControl> */}
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Product Ids"
                                    variant="outlined"
                                    value={pId}
                                    onChange={(e) => setPId(e.target.value)}
                                    onKeyDown={handleKeyDownProducts}
                                />
                                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 10 }}>
                                    {productIds.map((productId, index) => (
                                        <Chip
                                            key={index}
                                            label={productId}
                                            onDelete={() => handleProductIdDelete(productId)}
                                            deleteIcon={<CancelIcon />}
                                            style={{ marginRight: 5, marginBottom: 5 }}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            {/* {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.product}</Typography>
                            ))} */}
                        </Grid>

                    </Grid>


                    <Grid container spacing={2} sx={{ mt: 0.5 }}>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.description}</Typography>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            {!newsImage ? (
                                formData.coverImage && (
                                    <Box sx={{
                                        width: '100%',
                                        height: '150px',
                                        backgroundImage: `url(${formData.coverImage})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <Icon
                                            onClick={() => { handleCoverDeleteImage() }}
                                            component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.4 }} />
                                    </Box>
                                )
                            ) : (
                                newsImage && (
                                    <Box sx={{
                                        width: '100%',
                                        height: '150px',
                                        backgroundImage: `url(${URL.createObjectURL(newsImage)})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <Icon
                                            onClick={() => { handleNewCoverDeleteImage() }}
                                            component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.4 }} />
                                    </Box>
                                )
                            )}

                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid item xs={6}>
                            {!formData.coverImage && !newsImage ? (
                                <FormControl fullWidth>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <input
                                                type="file"
                                                accept="image/jpeg, image/jpg, image/png, image/webp"
                                                onChange={handleImageChange}
                                                style={{ display: 'none' }}
                                                id="news-files"
                                                // multiple
                                                disabled={loading}
                                            />
                                            <label htmlFor="news-files">
                                                <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}
                                                    disabled={loading}
                                                    style={{
                                                        color: !loading ? theme.palette.success.main : 'gray',
                                                        border: '1px solid',
                                                        borderColor: !loading ? theme.palette.success.main : 'gray'
                                                    }}
                                                >
                                                    Upload News Cover Image
                                                </Button>
                                            </label>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            ) : ''}

                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.coverImage}</Typography>
                            ))}
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
                                <DeleteBtn />

                                <Button type="submit" variant="contained" disabled={loading ? true : false} sx={{ backgroundColor: '#00ee34', ":hover": { backgroundColor: '#00ee34' }, width: '130px' }} >
                                    {loading ?
                                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                                        :
                                        'Update News'
                                    }
                                </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </form> */}
                </form>

                {productModalOpen ? (
                    <ProductCancelModal notFoundedIds={notFoundedIds} setProductModalOpen={setProductModalOpen} setLoading={setLoading} heading='These Product not Founded' />
                ) : ''}
            </Grid>
        </MainCard>
    );
};

export default EditNewsAndPromotion;
