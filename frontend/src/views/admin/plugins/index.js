import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress, Grid, Typography, Card } from '@mui/material';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import kinguinLogo from 'assets/images/landing/kinguin-logo.png'
import KinguinModal from 'ui-component/landing/Components/pluginModals/KinguinModal';
import tazapayLogo from 'assets/images/landing/tazapay-logo.jpg'
import TazaPayModal from 'ui-component/landing/Components/pluginModals/TazapayModal';
import woopkassaLogo from 'assets/images/landing/woopkassa-logo.jpg'
import WoopkassaModal from 'ui-component/landing/Components/pluginModals/WoopassaModal';
import citypayLogo2 from 'assets/images/landing/citypay-logo2.jpg'
import CityPayModal from 'ui-component/landing/Components/pluginModals/CitypayModal';

export default function Plugin() {
    const [loading, setLoading] = useState(true);
    const [kinguinOpen, setKinguinOpen] = useState(false);
    const [tazapayOpen, setTazapayOpen] = useState(false);
    const [woopkassaOpen, setWoopkassaOpen] = useState(false);
    const [citypayOpen, setCitypayOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [kinguinPluginData, setKinguinPluginData] = useState('');
    const [tazapayPluginData, setTazapayPluginData] = useState('');
    const [woopkassaPluginData, setWoopkassaPluginData] = useState('');
    const [citypayPluginData, setCitypayPluginData] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        myAxios
            .get('/admin/get-plugins')
            .then((response) => {
                const kinguin = response.data.data.results.find(plugin => plugin.name === 'Kinguin');
                const tazapay = response.data.data.results.find(plugin => plugin.name === 'TazaPay');
                const woopkassa = response.data.data.results.find(plugin => plugin.name === 'Woopkassa');
                const citypay = response.data.data.results.find(plugin => plugin.name === 'CityPay');
                setKinguinPluginData(kinguin);
                setTazapayPluginData(tazapay)
                setWoopkassaPluginData(woopkassa)
                setCitypayPluginData(citypay)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching News:', error);
            });
    }, [check]);

    return (
        <MainCard content={false} title="Plugins">
            {!loading ?
                (
                    <>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={4}>
                                <Card sx={{ border: '1px solid lightGray', p: 2, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                style={{ height: '80px' }}
                                                src={kinguinLogo}
                                                title="green iguana"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid>
                                                <Typography variant='h3'>Kinguin</Typography>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#ffde00', color: '#000000', mt: 2, ":hover": { backgroundColor: '#ffde00' } }} onClick={() => setKinguinOpen(true)}>Updrade</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ border: '1px solid lightGray', p: 2, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                style={{ height: '80px' }}
                                                src={tazapayLogo}
                                                title="green iguana"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid>
                                                <Typography variant='h3'>TazaPay</Typography>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#053c51', mt: 2, ":hover": { backgroundColor: '#053c51' } }} onClick={() => setTazapayOpen(true)}>Updrade</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ border: '1px solid lightGray', p: 2, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                style={{ height: '80px' }}
                                                src={woopkassaLogo}
                                                title="green iguana"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid>
                                                <Typography variant='h3'>Woopkassa</Typography>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#3baedd', mt: 2, ":hover": { backgroundColor: '#3baedd' } }} onClick={() => setWoopkassaOpen(true)}>Updrade</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Card sx={{ border: '1px solid lightGray', p: 2, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <img
                                                style={{ height: '80px' }}
                                                src={citypayLogo2}
                                                title="green iguana"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid>
                                                <Typography variant='h3'>CityPay</Typography>
                                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#fe3869', mt: 2, ":hover": { backgroundColor: '#fe3869' } }} onClick={() => setCitypayOpen(true)}>Updrade</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>
                        </Grid>

                        {kinguinOpen ?
                            <KinguinModal pluginName="Kinguin" modalLoading={modalLoading} setModalLoading={setModalLoading} kinguinOpen={kinguinOpen} setKinguinOpen={setKinguinOpen} kinguinPluginData={kinguinPluginData} check={check} setCheck={setCheck} />
                            : ''
                        }
                        {tazapayOpen ?
                            <TazaPayModal pluginName="TazaPay" modalLoading={modalLoading} setModalLoading={setModalLoading} tazapayOpen={tazapayOpen} setTazapayOpen={setTazapayOpen} tazapayPluginData={tazapayPluginData} check={check} setCheck={setCheck} />
                            : ''
                        }
                        {woopkassaOpen ?
                            <WoopkassaModal pluginName="Woopkassa" modalLoading={modalLoading} setModalLoading={setModalLoading} woopkassaOpen={woopkassaOpen} setWoopkassaOpen={setWoopkassaOpen} woopkassaPluginData={woopkassaPluginData} check={check} setCheck={setCheck} />
                            : ''
                        }
                        {citypayOpen ?
                            <CityPayModal pluginName="CityPay" modalLoading={modalLoading} setModalLoading={setModalLoading} citypayOpen={citypayOpen} setCitypayOpen={setCitypayOpen} citypayPluginData={citypayPluginData} check={check} setCheck={setCheck} />
                            : ''
                        }
                    </>
                )
                : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )
            }
        </MainCard>
    );
}
