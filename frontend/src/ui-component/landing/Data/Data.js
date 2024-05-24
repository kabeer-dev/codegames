import imag1 from '../../../assets/images/landing/SteamPurchase/InsImg6.svg';
import imag2 from '../../../assets/images/landing/SteamPurchase/InsImg5.svg';
import imag3 from '../../../assets/images/landing/SteamPurchase/InsImg3.svg';
import imag4 from '../../../assets/images/landing/SteamPurchase/InsImg4.svg';
import imag5 from '../../../assets/images/landing/SteamPurchase/InsImg2.svg';
import imag6 from '../../../assets/images/landing/SteamPurchase/InsImg1.svg';

import WooPay from '../../../assets/images/landing/woopkassa-logo.jpg';
import cityPay from '../../../assets/images/landing/citypay-logo.png';
import tazaPays from '../../../assets/images/landing/TAZAPAYs.svg';

export const Faqs = [
    {
        title: 'Which countries can you top up?',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'Limits and restrictions? ',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'What is a login?',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'I have a new or previously unfunded account',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'The amount received is less',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'Money did not arrive in STEAM wallet',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    },
    {
        title: 'The amount received is less',
        desc: 'We have prepared small instructions on where to get an ID in video and text format. To view the instructions, click here'
    }
];

export const replacement = [
    { id: 1, image: imag6, title: 'Enter your Xbox login' },
    {
        id: 2,
        image: imag5,
        title: 'Click on your avatar in the top right corner and click "Redeem Code".'
    },
    { id: 3, image: imag4, title: 'Click "Activate" in the middle of the page.' },
    { id: 4, image: imag3, title: 'Enter your code and click "Activate"' },
    { id: 5, image: imag2, title: 'Confirm the redemption by clicking "Confirm".' },
    { id: 6, image: imag1, title: 'Click "Close" after successful activation' }
];

// export const payments = [
//     { image: pay1, name: 'wmoney' },
//     { image: pay2, name: 'qiwi' },
//     { image: pay3, name: 'wooppay' },
//     { image: pay4, name: 'card' }
// ];
export const payments = [
    { image: WooPay, name: 'wooppay', displayName: 'Woopkassa' },
    { image: cityPay, name: 'qiwi', displayName: 'CityPay' },
    { image: tazaPays, name: 'card', displayName: 'TazaPay' }
];

export const replenishment = [
    {
        id: 1,
        name: 'Enter your Steam login.',
        link: 'How to find out your login?'
    },
    { id: 2, name: 'Enter your Steam top-up amount', link: ' ' },
    {
        id: 3,
        name: 'Make sure you have entered your login and not your nickname.',
        link: ' '
    },
    { id: 4, name: 'Choose and pay using any payment method', link: ' ' },
    {
        id: 5,
        name: 'You will be taken to a page where you need to select a payment method.',
        link: ' '
    }
];

