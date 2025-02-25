import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Button, Grid, TextField, Select, FormControl, MenuItem, InputLabel, useTheme, Box, Icon, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config'

const EditSeoBlock = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { seoBlock, seoBlocks } = location.state;

    let editSeoBlock = '';
    let currentSort = seoBlock.sort
    if (seoBlock) {
        editSeoBlock = seoBlock
    }

    const [seoImage, setSeoImage] = useState('');
    const [formData, setFormData] = useState({
        title: editSeoBlock.title ? editSeoBlock.title : '',
        description: editSeoBlock.description ? editSeoBlock.description : '',
        sort: editSeoBlock.sort ? editSeoBlock.sort : '',
        image: editSeoBlock.image ? editSeoBlock.image : '',
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    let indexArray = [];
    if (seoBlocks) {
        if (editSeoBlock) {
            indexArray = Array.from({ length: seoBlocks.length }, (_, i) => i + 1);
        } else {
            indexArray = Array.from({ length: seoBlocks.length + 1 }, (_, i) => i + 1);
        }
    } else {
        indexArray = [1]
    }

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

    const handleGameCatalogImageChange = async (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const webpFiles = Array.from(files).filter((file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/webp');
            setSeoImage(webpFiles[0]);
            setErrors([{ image: '' }])
        }
    };

    const handleSubmit = async (event) => {
        setErrors([])
        setLoading(true)
        event.preventDefault();

        let swapId = ''
        let swapSort = ''
        if (formData.sort != currentSort) {
            const changeableId = seoBlocks.filter(item => item.sort === formData.sort);
            swapId = changeableId[0]._id
            swapSort = currentSort;
        }
        if (!seoImage) {
            if (!formData.image) {
                setErrors([{ image: 'No Image Selected' }])
                setLoading(false)
                return
            }
            const data = {
                _id: editSeoBlock._id,
                title: formData.title,
                description: formData.description,
                sort: formData.sort,
                image: formData.image,
                swapId: swapId,
                swapSort: swapSort
            }

            const response = await myAxios.post('/admin/update-seo-block', data).catch((error) => {
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
            })
            if (response && response.status === 200) {
                setLoading(false)
                navigate('/admin/seo-blocks')
            }
        } else {
            if (!seoImage) {
                setErrors([{ image: 'No Image Selected' }])
                setLoading(false)
                return
            }
            //s3
            const s3 = new AWS.S3();
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${seoImage.name}`,
                Body: seoImage,
            };

            s3.upload(params, async (err, imageData) => {
                if (err) {
                    setLoading(false)
                    console.error('Error uploading to S3', err);
                } else {
                    const data = {
                        _id: editSeoBlock._id,
                        title: formData.title,
                        description: formData.description,
                        sort: formData.sort,
                        image: imageData.Location,
                        swapId: swapId,
                        swapSort: swapSort
                    }
                    const response = await myAxios.post('/admin/update-seo-block', data).catch((error) => {
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
                    })
                    if (response && response.status === 200) {
                        setLoading(false)
                        navigate('/admin/seo-blocks')
                    }
                }
            })
        }
    };

    const handleNewSeoDeleteImage = () => {
        setSeoImage('')
    }

    const handleSeoDeleteImage = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: ''
        }));
    }

    return (
        <MainCard title='Update SEO Block'>
            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" type='text' label="SEO Block Title" name='title' variant="outlined" value={formData.title} onChange={handleChange} />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.title}</Typography>
                            ))}
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                                <Select
                                    id="sort"
                                    label='Sort'
                                    name="sort"
                                    onChange={handleChange}
                                    value={formData.sort}
                                >
                                    {indexArray.map((index) => (
                                        <MenuItem key={index} value={index}>{index}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.sort}</Typography>
                            ))}
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <textarea id="outlined-basic" rows={5} placeholder="Description" name='description' variant="outlined" value={formData.description} onChange={handleChange}
                                    style={{ padding: '10px' }}
                                />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.description}</Typography>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            {!seoImage ? (
                                formData.image && (

                                    <Box sx={{
                                        width: '100%',
                                        height: '130px',
                                        backgroundImage: `url(${formData.image})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <Icon
                                            onClick={() => { handleSeoDeleteImage() }}
                                            component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.4 }} />
                                    </Box>
                                )
                            ) : (
                                seoImage && (

                                    <Box sx={{
                                        width: '100%',
                                        height: '130px',
                                        backgroundImage: `url(${URL.createObjectURL(seoImage)})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}>
                                        <Icon
                                            onClick={() => { handleNewSeoDeleteImage() }}
                                            component={CloseIcon} sx={{ fontSize: 'medium', backgroundColor: 'white', ':hover': { backgroundColor: 'red' }, borderRadius: '50px', cursor: 'pointer', float: 'right', m: 0.4 }} />
                                    </Box>
                                )
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            {!seoImage && !formData.image ? (
                                <Grid>
                                    <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp"
                                        name='image' onChange={handleGameCatalogImageChange}
                                        style={{ display: 'none' }}
                                        id="cover-image-file"
                                        disabled={loading}
                                    />
                                    <label htmlFor="cover-image-file">
                                        <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}
                                            disabled={loading}
                                            style={{
                                                color: !loading ? theme.palette.success.main : 'gray',
                                                border: '1px solid',
                                                borderColor: !loading ? theme.palette.success.main : 'gray'
                                            }}
                                        >
                                            Upload SEO Block Image
                                        </Button>
                                    </label>
                                </Grid>
                            ) : ''}

                            {errors && !formData.image && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.image}</Typography>
                            ))}

                        </Grid>

                        <Grid item xs={6}>
                            <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
                                <DeleteBtn />

                                <Button type="submit" variant="contained" disabled={loading || loading ? true : false} sx={{ backgroundColor: '#00ee34', ":hover": { backgroundColor: '#00ee34' }, width: '150px' }} >
                                    {loading ?
                                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                                        :
                                        'Update SEO Block'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default EditSeoBlock;
