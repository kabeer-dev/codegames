import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Button, Grid, TextField, Select, FormControl, MenuItem, InputLabel, Typography, CircularProgress } from '@mui/material';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';

const ratingData = [
    { id: 1, rating: 0 },
    { id: 2, rating: 1 },
    { id: 3, rating: 2 },
    { id: 4, rating: 3 },
    { id: 5, rating: 4 },
    { id: 6, rating: 5 },
]

const AddAndEditReviews = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { review, reviews } = location.state;

    let editReview = '';
    let reviewSorts = reviews.map(item => item.sort);
    let currentSort = ''
    if (review) {
        editReview = review
        currentSort = editReview.sort
    }
    const [formData, setFormData] = useState({
        userName: editReview.userName ? editReview.userName : '',
        rating: editReview.rating ? editReview.rating : '',
        message: editReview.message ? editReview.message : '',
        sort: editReview.sort ? editReview.sort : '',
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);

    let indexArray = [];
    if (reviews) {
        if (review) {
            indexArray = Array.from({ length: reviews.length }, (_, i) => i + 1);
        } else {
            indexArray = Array.from({ length: reviews.length + 1 }, (_, i) => i + 1);
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


    const handleSubmit = async (event) => {
        setErrors([])
        setLoading(true)
        event.preventDefault();
        let swapId = ''
        let swapSort = ''
        if (!editReview) {
            const indexInArray = reviewSorts.indexOf(formData.sort);
            if (indexInArray !== -1) {
                const changeableId = reviews.filter(item => item.sort === formData.sort);
                swapId = changeableId[0]._id
                swapSort = indexArray.length;
            }
        } else {
            if (formData.sort != currentSort) {
                const changeableId = reviews.filter(item => item.sort === formData.sort);
                swapId = changeableId[0]._id
                swapSort = currentSort;
            }
        }
        const data = editReview ? {
            _id: editReview._id,
            userName: formData.userName,
            rating: formData.rating,
            message: formData.message,
            sort: formData.sort,
            swapId: swapId,
            swapSort: swapSort
        } : {
            userName: formData.userName,
            rating: formData.rating,
            message: formData.message,
            sort: formData.sort,
            swapId: swapId,
            swapSort: swapSort
        }

        const response = await myAxios.post('/admin/add-edit-review', data).catch((error) => {
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
            navigate('/admin/reviews')
        }
    };

    return (
        <MainCard title={`${editReview ? 'Edit' : 'Add'} Reviews`}>
            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" type='text' label="User Name" name='userName' variant="outlined" value={formData.userName} onChange={handleChange} />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.userName}</Typography>
                            ))}
                        </Grid>

                        <Grid item xs={1.5}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                <Select
                                    id="rating"
                                    label='Rating'
                                    name="rating"
                                    onChange={handleChange}
                                    value={formData.rating}
                                >
                                    {ratingData.map((rating, index) => (
                                        <MenuItem key={index} value={rating.rating}>{rating.rating} Stars</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.rating}</Typography>
                            ))}
                        </Grid>

                        {/* <Grid item xs={2}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={formData.isVarified}
                                    onChange={() => setFormData({
                                        ...formData,
                                        isVarified: !formData.isVarified // Invert the value
                                    })}
                                    name="Varified"
                                    inputProps={{ 'aria-label': 'A' }}
                                />}
                                label="Is Verified"
                            />
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.isVarified}</Typography>
                            ))}
                        </Grid> */}

                        <Grid item xs={1.5}>
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

                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" placeholder="Message" name='message' variant="outlined" value={formData.message} onChange={handleChange}

                                />
                            </FormControl>
                            {errors && errors.map((err) => (
                                <Typography sx={{ color: 'red', mt: 0.5 }}>{err.message}</Typography>
                            ))}
                        </Grid>

                    </Grid>

                    <Grid container sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
                        <DeleteBtn />
                        <Grid item xs={2}>
                            <Button fullWidth type="submit" variant="contained" disabled={loading || urlLoading ? true : false} sx={{ backgroundColor: '#00ee34', ":hover": { backgroundColor: '#00ee34' } }} >
                                {loading ?
                                    <CircularProgress sx={{ color: 'gray' }} size={24} />
                                    :
                                    `${editReview ? 'Update' : 'Add'} Reviews`
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default AddAndEditReviews;
