import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/admin/Dashboard')));
const Orders = Loadable(lazy(() => import('views/admin/orders')));
const Transactions = Loadable(lazy(() => import('views/admin/transactions')));
const Stories = Loadable(lazy(() => import('views/admin/stories')));
const AddStory = Loadable(lazy(() => import('views/admin/stories/add')));
const EditStory = Loadable(lazy(() => import('views/admin/stories/edit')));
const Regions = Loadable(lazy(() => import('views/admin/regions')));
const Bannner = Loadable(lazy(() => import('views/admin/banner')));
const AddBanner = Loadable(lazy(() => import('views/admin/banner/add')));
const EditBanner = Loadable(lazy(() => import('views/admin/banner/edit')));
// const CustomGames = Loadable(lazy(() => import('views/admin/custome-games')));
// const AddCustomGames = Loadable(lazy(() => import('views/admin/custome-games/add')));
// const EditCustomGames = Loadable(lazy(() => import('views/admin/custome-games/edit')));
const AddSingleProduct = Loadable(lazy(() => import('views/admin/add-products-kinguin/add-single-product')));
const AddProductsWithDenominations = Loadable(lazy(() => import('views/admin/add-products-kinguin/add-product-with-denominations')));
const FastCategories = Loadable(lazy(() => import('views/admin/fast-categories')));
const PopularServices = Loadable(lazy(() => import('views/admin/popular-services')));
const MobileGames = Loadable(lazy(() => import('views/admin/mobile-games')));
const SubAndPaymentCard = Loadable(lazy(() => import('views/admin/sub-and-Payments')));
const PlayStation = Loadable(lazy(() => import('views/admin/game-catalog/playstation')));
const Xbox = Loadable(lazy(() => import('views/admin/game-catalog/xbox')));
const Steam = Loadable(lazy(() => import('views/admin/game-catalog/steam')));
const Pc = Loadable(lazy(() => import('views/admin/game-catalog/pc')));
// const Nintendo = Loadable(lazy(() => import('views/admin/game-catalog/nintendo')));
// const Other = Loadable(lazy(() => import('views/admin/game-catalog/other')));
const PubgPage = Loadable(lazy(() => import('views/admin/pubg-page')));
const SteamPage = Loadable(lazy(() => import('views/admin/steam-page')));
const NewsAndPromotions = Loadable(lazy(() => import('views/admin/news-and-promotions')));
const AddNewsAndPromotion = Loadable(lazy(() => import('views/admin/news-and-promotions/add')));
const EditNewsAndPromotion = Loadable(lazy(() => import('views/admin/news-and-promotions/edit')));
const Reviews = Loadable(lazy(() => import('views/admin/reviews')));
const AddAndEditReviews = Loadable(lazy(() => import('views/admin/reviews/addAndEdit')));
const SeoBlock = Loadable(lazy(() => import('views/admin/seo-block')));
const AddSeoBlock = Loadable(lazy(() => import('views/admin/seo-block/add')));
const EditSeoBlock = Loadable(lazy(() => import('views/admin/seo-block/edit')));
const Plugin = Loadable(lazy(() => import('views/admin/plugins')));
const Logout = Loadable(lazy(() => import('views/admin/logout')));

const UpdateMultiDenomination = Loadable(lazy(() => import('views/admin/common-module/updateMultiDenomibation')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/admin',
            element: <SamplePage />
        },
        {
            path: '/admin/orders',
            element: <Orders />
        },
        {
            path: '/admin/transactions',
            element: <Transactions />
        },
        {
            path: '/admin/stories',
            element: <Stories />
        },
        {
            path: '/admin/stories/add',
            element: <AddStory />
        },
        {
            path: '/admin/stories/edit',
            element: <EditStory />
        },
        {
            path: '/admin/regions',
            element: <Regions />
        },
        {
            path: '/admin/banners',
            element: <Bannner />
        },
        {
            path: '/admin/add-banner',
            element: <AddBanner />
        },
        {
            path: '/admin/edit-banner',
            element: <EditBanner />
        },
        // {
        //     path: '/admin/custom-games',
        //     element: <CustomGames />
        // },
        // {
        //     path: '/admin/add-custom-game',
        //     element: <AddCustomGames />
        // },
        // {
        //     path: '/admin/edit-custom-game',
        //     element: <EditCustomGames />
        // },
        {
            path: '/admin/add-single-product',
            element: <AddSingleProduct />
        },
        {
            path: '/admin/add-products-with-denominations',
            element: <AddProductsWithDenominations />
        },
        {
            path: '/admin/fast-categories',
            element: <FastCategories />
        },
        {
            path: '/admin/pupular-services',
            element: <PopularServices />
        },
        {
            path: '/admin/mobile-games',
            element: <MobileGames />
        },
        {
            path: '/admin/sub-and-payments',
            element: <SubAndPaymentCard />
        },
        {
            path: '/admin/playStation-games',
            element: <PlayStation />
        },
        {
            path: '/admin/xbox-games',
            element: <Xbox />
        },
        {
            path: '/admin/staem-games',
            element: <Steam />
        },
        {
            path: '/admin/pc-games',
            element: <Pc />
        },
        // {
        //     path: '/admin/nintendo-games',
        //     element: <Nintendo />
        // },
        // {
        //     path: '/admin/other-games',
        //     element: <Other />
        // },
        {
            path: '/admin/pubg',
            element: <PubgPage />
        },
        {
            path: '/admin/steam',
            element: <SteamPage />
        },
        {
            path: '/admin/news-and-promotions',
            element: <NewsAndPromotions />
        },
        {
            path: '/admin/add-news-and-promotions',
            element: <AddNewsAndPromotion />
        },
        {
            path: '/admin/edit-news-and-promotions',
            element: <EditNewsAndPromotion />
        },
        {
            path: '/admin/reviews',
            element: <Reviews />
        },
        {
            path: '/admin/add-edit-reviews',
            element: <AddAndEditReviews />
        },
        {
            path: '/admin/seo-blocks',
            element: <SeoBlock />
        },
        {
            path: '/admin/add-seo-block',
            element: <AddSeoBlock />
        },
        {
            path: '/admin/edit-seo-block',
            element: <EditSeoBlock />
        },
        {
            path: '/admin/plugins',
            element: <Plugin />
        },
        {
            path: '/admin/logout',
            element: <Logout />
        },

        {
            path: '/admin/update-multi-denominations',
            element: <UpdateMultiDenomination />
        },
    ]
};

export default MainRoutes;
