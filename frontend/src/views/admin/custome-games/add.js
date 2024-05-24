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
    TextareaAutosize,
    Typography,
    CircularProgress,
    Icon,
    Box
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import { height, useTheme, width } from '@mui/system';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config'

const AddCustomGame = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        productId: '',
        name: '',
        price: '',
        totalQty: '',
        platform: '',
        description: '',
        activationDetails: '',
        systemRequirements: '',
        coverImageOriginal: '',
        screenshots: []
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [gameImages, setGameImages] = useState([]);

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

    const handleCoverImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter((file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
            setCoverImage(webpFiles[0]);
        }
    };

    const handleImagesChange = (event) => {
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter((file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
            setGameImages(webpFiles);
        }
    };

    const handleCoverDeleteImage = () => {
        setLoading(true)
        setCoverImage('')
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     coverImageOriginal: ''
        // }));
        setLoading(false)
    }

    const handleDeleteGameImage = (indexToDelete) => {
        setLoading(true)
        const filterImages = gameImages.filter((_, index) => index !== indexToDelete)
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     screenshots: filterImages
        // }));
        setGameImages(filterImages)
        setLoading(false)
    }

    const handleSubmit = async (event) => {
        setErrors([]);
        setLoading(true);
        event.preventDefault();
        let tempImages = []
        if (gameImages.length <= 0) {
            setErrors([{ screenshots: 'No Image Selected' }])
            setLoading(false)
            return
        }else if(!coverImage){
            setErrors([{ coverImageOriginal: 'No Image Selected' }])
            setLoading(false)
        }
        //S3
        const s3 = new AWS.S3();
        const promises = gameImages.map(async (file) => {
            const timestamp = Date.now(); // Get a unique timestamp
            const uniqueFileName = `${timestamp}_${file.name}`; // Append timestamp to the file name
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${uniqueFileName}`,
                Body: file,
            };

            try {
                const data = await s3.upload(params).promise();
                return data.Location;

            } catch (err) {
                console.error('Error uploading to S3', err);
                setLoading(false)
                throw err;
            }
        });

        try {
            const uploadResults = await Promise.all(promises);
            const screenshots = uploadResults.map((url) => ({ url }));
            tempImages = screenshots;

            const s3 = new AWS.S3();
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${coverImage}`,
                Body: coverImage,
            };
            s3.upload(params, async (err, coverImageData) => {
                if (err) {
                    setLoading(false)
                    console.error('Error uploading to S3', err);
                } else {
                    const data = {
                        productId: formData.productId,
                        name: formData.name,
                        price: formData.price,
                        totalQty: formData.totalQty,
                        platform: formData.platform,
                        activationDetails: formData.activationDetails,
                        systemRequirements: formData.systemRequirements,
                        description: formData.description,
                        coverImageOriginal: coverImageData.Location,
                        screenshots: tempImages,
                        isCustom: true
                    }

                    const response = await myAxios.post('/admin/add-custom-game', data).catch((error) => {
                        if (error.response) {
                            console.error('Error Response:', error.response);
                            setLoading(false);
                            if (error.response.status === 422) {
                                const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                                    [validationError.field]: validationError.message
                                }));
                                setLoading(false);
                                setErrors(newValidationErrors);
                            }
                        } else {
                            console.error('Error:', error.message);
                            setLoading(false);
                        }
                    });
                    if (response && response.status === 200) {
                        setLoading(false);
                        navigate('/admin/custom-games');
                    }
                }
            })
        } catch (err) {
            console.error('Error uploading multiple files', err);
            throw err; // Handle error as needed
        }

    };

    return (
        <MainCard title='Add Custom Game'>
            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    type="text"
                                    label="Product Id"
                                    name="productId"
                                    variant="outlined"
                                    value={formData.productId}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.productId}</Typography>)}
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    type="text"
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.name}</Typography>)}
                        </Grid>

                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    type="number"
                                    label="Price"
                                    name="price"
                                    variant="outlined"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.price}</Typography>)}
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    type="number"
                                    label="Total Qty"
                                    name="totalQty"
                                    variant="outlined"
                                    value={formData.totalQty}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.totalQty}</Typography>)}
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Platform"
                                    name="platform"
                                    variant="outlined"
                                    value={formData.platform}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.platform}</Typography>)}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic1"
                                    rows={4}
                                    multiline
                                    label="Activation Details"
                                    name="activationDetails"
                                    value={formData.activationDetails}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.activationDetails}</Typography>)}
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic2"
                                    rows={4}
                                    multiline
                                    label="System Requirments"
                                    name="systemRequirements"
                                    value={formData.systemRequirements}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors &&
                                errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.systemRequirements}</Typography>)}
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic3"
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.description}</Typography>)}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            {coverImage && (
                                <Grid item xs={8} sx={{ pt: 2 }}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '100px',
                                        backgroundImage: `url(${URL.createObjectURL(coverImage)})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <Icon
                                            onClick={() => { handleCoverDeleteImage() }}
                                            component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.3 }} />
                                    </Box>

                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={7}>
                            {gameImages.length > 0 ? (
                                <Grid container spacing={2}>
                                    {gameImages.map((image, index) => (
                                        <Grid item xs={3} sx={{ mt: 2 }}>
                                            <Box sx={{
                                                width: '100%',
                                                height: '100px',
                                                backgroundImage: `url(${URL.createObjectURL(image)})`, // Set background image
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}>
                                                <Icon
                                                    onClick={() => { handleDeleteGameImage(index) }}
                                                    component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.3 }} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                ''
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={5}>
                            {!coverImage ? (
                                <Grid>
                                    <input
                                        type="file"
                                        accept="image/jpeg, image/jpg, image/png, image/webp"
                                        name="coverImageOriginal"
                                        onChange={handleCoverImageChange}
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
                                            Upload Cover Image
                                        </Button>
                                    </label>

                                </Grid>
                            ) : ''}


                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.coverImageOriginal}</Typography>)}

                        </Grid>

                        <Grid item xs={7}>
                            <Grid container>
                                <Grid item xs={6}>

                                    {!gameImages.length > 0 ? (
                                        <Grid>
                                            <input
                                                type="file"
                                                accept="image/jpeg, image/jpg, image/png, image/webp"
                                                name="screenshots"
                                                onChange={handleImagesChange}
                                                multiple
                                                style={{ display: 'none' }}
                                                id="images-file"
                                                disabled={loading}
                                            />
                                            <label htmlFor="images-file">
                                                <Button
                                                    variant="outlined"
                                                    component="span"
                                                    startIcon={<CloudUploadIcon />}
                                                    disabled={loading}
                                                    style={{
                                                        color: !loading ? theme.palette.success.main : 'gray',
                                                        border: '1px solid',
                                                        borderColor: !loading ? theme.palette.success.main : 'gray'
                                                    }}
                                                >
                                                    Upload Game Images
                                                </Button>
                                            </label>
                                        </Grid>
                                    ) : ''}

                                    {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.screenshots}</Typography>)}
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <DeleteBtn />

                                        <Button

                                            type="submit"
                                            variant="contained"
                                            disabled={loading ? true : false}
                                            sx={{ backgroundColor: '#00ee34', ':hover': { backgroundColor: '#00ee34' }, width: '200px' }}
                                        >
                                            {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Add Custom Game'}
                                        </Button>

                                    </Grid>
                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default AddCustomGame;
