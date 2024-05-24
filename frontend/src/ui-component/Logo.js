// material-ui
import { useTheme } from '@mui/material/styles';

import logo from '../assets/images/landing/Greenlogo.svg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <div>
            <img src={logo} alt="Berry" width="75%" height="32" />
        </div>
    );
};

export default Logo;
