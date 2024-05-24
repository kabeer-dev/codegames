import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    CircularProgress,
    Grid,
    Typography,
    useTheme,
    IconButton,
    Tooltip
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from 'ui-component/landing/Components/deleteModal';

const columns = [
    // { id: 'pId', label: 'Product Id', minWidth: 100 },
     { id: '#', label: '#', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'totalQty', label: 'Total Qty', minWidth: 100 },
    { id: 'coverImage', label: 'Cover Image', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
];

export default function CustomGames() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [customGames, setCustomGames] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('');
    const [currentId, setCurrentId] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    useEffect(() => {
        const getCustomGames = async () => {
            const response = await myAxios.get('/admin/get-custom-games');
            if (response.status === 200) {
                setLoading(false)
                setCustomGames(response.data.data.getCustomGames);
            } else {
                console.error('Error fetching Games:', response.data);
            }
        };
        getCustomGames();
    }, []);

    const handleAddCustomGame = () => {
        navigate('/admin/add-custom-game');
    };

    const handleDelete = async (game_id, index) => {
        const response = await myAxios.post('/admin/delete-custom-games', { id: game_id });
        const filterArray = customGames;
        filterArray.splice(index, 1);
        setCustomGames([...filterArray]);
        setModalLoading(false)
        setOpen(false)
    };

    return (
        <MainCard
            content={false}
            title="Custom Games"
            secondary={
                <Button
                    variant="outlined"
                    onClick={handleAddCustomGame}
                    style={{ color: theme.palette.success.main, border: '1px solid', borderColor: !loading ? theme.palette.success.main : 'gray', width: '200px' }}
                    disabled={loading ? true : false}
                >
                    {!loading ?
                        'Add Custom Game'
                        :
                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                    }
                </Button>
            }
        >
            {!loading ? (
                customGames.length > 0 ? (
                    <Grid>
                        {/* table */}
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
                                    {customGames
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <>
                                                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                                                    {/* <TableCell sx={{ textAlign: 'center' }}>{row.productId}</TableCell> */}
                                                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.price}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.totalQty}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <img src={row.coverImageOriginal} style={{ width: '50px', height: '50px', borderRadius: 8 }} />
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Tooltip title="Edit" placement="top">
                                                            <IconButton
                                                                onClick={() => navigate('/admin/edit-custom-game', { state: { editGame: row } })}
                                                            >
                                                                <ModeIcon sx={{ color: theme.palette.success.main }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete" placement="top">
                                                            <IconButton sx={{ ml: 1 }} onClick={() => { setCurrentIndex(index); setCurrentId(row._id); setOpen(true) }}>
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>

                                            </>

                                        ))}
                                </TableBody>
                            </Table>
                            <DeleteModal open={open} handleOpen={handleOpen} handleClose={handleClose} moduleName={'Custom Game'} handleDelete={handleDelete} index={currentIndex} id={currentId} modalLoading={modalLoading} setModalLoading={setModalLoading} />
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={customGames.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Grid>
                ) : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography sx={{ fontSize: 15 }}>No Record Founded</Typography>
                    </Grid>
                )
            ) : (
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress sx={{ color: '#00ee34' }} />
                </Grid>
            )}
        </MainCard>
    );
}
