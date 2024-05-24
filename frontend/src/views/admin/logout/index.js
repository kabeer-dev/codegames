import * as React from 'react';
import { useState } from 'react';
import { Grid, CircularProgress, Typography, Box, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import logoutImage from 'assets/images/landing/logout-image.png'
import useAuth from 'hooks/useAuth';
import { activeItem } from '../../../store/slices/menu';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default function Logout() {
    const dispatch = useDispatch();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };
    const [modalLoading, setModalLoading] = useState(false);

    return (
        <MainCard
            content={false}
            title="Logout"

        >
            <Grid>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h2" sx={{ textAlign: 'center', py: 1.5 }}>
                            Logout
                        </Typography>
                        <Box sx={{ borderBottom: 1, color: 'lightgray' }} />
                        <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <img
                                src={logoutImage}
                                alt="successfully-img"
                                width={60}
                            />
                        </Grid>

                        <Typography
                            variant="h4"
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            style={{ textAlign: 'center', padding: '0 55px' }}
                        >
                            Are you sure you want to Logout?
                        </Typography>

                        <Box sx={{ borderBottom: 1, margin: '18px 0', color: 'lightgray' }} />
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: 'lightGray',
                                    padding: '5px 30px',
                                    color: 'black'
                                }}
                                onClick={() => {
                                    dispatch(activeItem(['dashboard']));
                                    navigate('/admin')
                                }}
                            >
                                No
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: modalLoading ? 'gray' : '#fb4b4b',
                                    padding: '8px 40px',
                                    color: 'white'
                                }}
                                disabled={modalLoading}
                                onClick={() => {
                                    setModalLoading(true)
                                    handleLogout()
                                }

                                }
                            >
                                {modalLoading ?
                                    (
                                        <CircularProgress sx={{ color: 'white' }} size={24} />
                                    ) :
                                    ('Yes')
                                }

                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </MainCard>
    );
}
