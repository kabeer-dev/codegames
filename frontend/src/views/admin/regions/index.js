import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Switch,
    CircularProgress,
    Grid,
    Typography,
    useTheme
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';;

//Tabel Head Row
const columns = [
    { id: '#', label: '#', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'flag', label: 'Flag', minWidth: 100 },
    { id: 'hot', label: 'Hot', minWidth: 100 },
];

export default function Stories() {
    const theme = useTheme();
    const [regions, setRegions] = useState('');
    const [loading, setLoading] = useState(false)

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
        myAxios
            .get('/admin/get-regions')
            .then((response) => {
                setRegions(response.data.data.regions);
            })
            .catch((error) => {
                console.error('Error fetching Regions:', error);
            });
    }, []);

    const handleHotToggle = async (index, id) => {
        const newDataArray = [...regions];
        newDataArray[index].hot = !newDataArray[index].hot;
        const response = await myAxios.post('/admin/update-region-hot', { region_id: id, hot: newDataArray[index].hot });
        if (response.status === 200) {
            setRegions(newDataArray);
            setLoading(false)
        }
    };

    return (
        <MainCard
            content={false}
            title="Regions"
        >
            {regions ? (
                regions.length > 0 ? (
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
                                    {regions
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <img src={row.flg} alt='flag' style={{ maxWidth: 120, borderRadius: 8 }} />
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Switch
                                                        sx={{
                                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                                color: theme.palette.success.main
                                                            },
                                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                backgroundColor: theme.palette.success.main
                                                            }
                                                        }}
                                                        disabled={loading}
                                                        checked={row.hot}
                                                        onChange={() => { setLoading(true); handleHotToggle(index, row._id) }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>

                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={regions.length}
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
