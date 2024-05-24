import { useRoutes } from 'react-router-dom';

// routes
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

//landing
import HomePage from '../views/pages/landing/homePages';
import GameCatalogue from 'views/pages/landing/gameCatalogue';
import GamePurchase from 'views/pages/landing/gamePurchase';
import SteamPurchase from 'views/pages/landing/steamPurchase';
import SteamGiftCardPurchase from 'views/pages/landing/steamGiftCard';
import PUBGPurchase from 'views/pages/landing/PubGPurchase';
import XBOX from 'views/pages/landing/XBOX';
import News from 'views/pages/landing/News';
import FAQs from 'views/pages/landing/FAQS';
import NewsAndPermotion from 'views/pages/landing/NewsAndPromotion';
import Payment from 'views/pages/landing/payment';
import PaymentSuccess from 'views/pages/landing/payment/PaymentSuccess';
import PrivacyAndPolicy from 'views/pages/landing/PrivacyAndPolicy';
import UserAgreemant from 'views/pages/landing/UserAgreemant';

import NotFound from 'views/pages/landing/NotFound';
import GamesAPI from 'views/pages/landing/gamesAPI'
import Topup from 'views/pages/landing/topup'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/game-catalog', element: <GameCatalogue /> },
        { path: '/game-purchase', element: <GamePurchase /> },
        { path: '/steam-purchase', element: <SteamPurchase /> },
        { path: '/steam-gift-card-purchase', element: <SteamGiftCardPurchase /> },
        { path: '/pubg-purchase', element: <PUBGPurchase /> },
        { path: '/xbox', element: <XBOX /> },
        { path: '/news', element: <News /> },
        { path: '/faqs', element: <FAQs /> },
        { path: '/privacy-policy', element: <PrivacyAndPolicy /> },
        { path: '/user-agreement', element: <UserAgreemant /> },
        { path: '/news-promotion', element: <NewsAndPermotion /> },
        { path: '/payment', element: <Payment /> },
        { path: '/payment-success', element: <PaymentSuccess /> },

        { path: '/games-api', element: <GamesAPI /> },
        { path: '/topup', element: <Topup /> },
        LoginRoutes,
        MainRoutes,
        { path: '*', element: <NotFound /> }
    ]);
}
