// routing
import Routes from 'routes';
// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';
// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRegion } from './store/slices/landing/showMobileDropDown';
import { fetchStories } from './store/slices/landing/showStatus';
import { selectCountry, selectCurrencyData } from './store/slices/landing/showMobileDropDown';

// ==============================|| APP ||============================== //
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!sessionStorage.getItem('selectedCountry')) {
            dispatch(fetchRegion());
        }
        dispatch(fetchStories());
    }, [dispatch]);

    if (sessionStorage.getItem('selectedCountry') && sessionStorage.getItem('selectedCountryFlag')) {
        dispatch(
            selectCountry({ name: `${sessionStorage.getItem('selectedCountry')}`, flg: `${sessionStorage.getItem('selectedCountryFlag')}` })
        );
    }

    if (sessionStorage.getItem('selectCurrency')) {
        dispatch(selectCurrencyData({ name: `${sessionStorage.getItem('selectCurrency')}` }));
    }
    
    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
