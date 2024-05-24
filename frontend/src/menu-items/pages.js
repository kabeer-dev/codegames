// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { AiOutlineDashboard } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdWebStories } from "react-icons/md";
import { MdAmpStories } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { IoNewspaper } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { SiPubg } from "react-icons/si";
import { FaSteam } from "react-icons/fa";
// import { MdPaid } from "react-icons/md";
import { BsPlugin } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: ' ',
    icon: 'pages',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/admin',
            icon: AiOutlineDashboard,
            breadcrumbs: false
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/admin/orders',
            icon: FaShoppingBag,
            breadcrumbs: false
        },
        {
            id: 'transactions',
            title: 'Transactions',
            type: 'item',
            url: '/admin/transactions',
            icon: AiOutlineTransaction,
            breadcrumbs: false
        },
        {
            id: 'stories',
            title: 'Stories',
            type: 'item',
            url: '/admin/stories',
            icon: MdWebStories,
            breadcrumbs: false
        },
        {
            id: 'regions',
            title: 'Regions',
            type: 'item',
            url: '/admin/regions',
            icon: AiOutlineGlobal,
            breadcrumbs: false
        },
        {
            id: 'banners',
            title: 'Banners',
            type: 'item',
            url: '/admin/banners',
            icon: MdAmpStories,
            breadcrumbs: false
        },
        // {
        //     id: 'custom-games',
        //     title: 'Custom Games',
        //     type: 'item',
        //     url: '/admin/custom-games',
        //     icon: MdOutlineGames,
        //     breadcrumbs: false
        // },
        {
            id: 'add-product-from-kinguin',
            title: 'Add Kinguin Products',
            // type: 'item',
            icon: RiProductHuntLine,
            type: 'collapse',
            children: [
                {
                    id: 'single-product',
                    title: <FormattedMessage id="Single Product" />,
                    type: 'item',
                    url: '/admin/add-single-product',
                    breadcrumbs: false,
                },
                {
                    id: 'denominations-products',
                    title: <FormattedMessage id="Denominations Products" />,
                    type: 'item',
                    url: '/admin/add-products-with-denominations',
                    breadcrumbs: false,
                },
            ]
        },
        {
            id: 'fast-categories',
            title: 'Fast Categories',
            type: 'item',
            url: '/admin/fast-categories',
            icon: MdCategory,
            breadcrumbs: false
        },
        {
            id: 'popular-services',
            title: 'Popular Services',
            type: 'item',
            url: '/admin/pupular-services',
            icon: FaThumbsUp,
            breadcrumbs: false
        },
        {
            id: 'mobile-games',
            title: 'Mobile Games',
            type: 'item',
            url: '/admin/mobile-games',
            icon: FaMobile,
            breadcrumbs: false
        },
        {
            id: 'sub-and-payments',
            title: 'Sub & Payment Cards',
            type: 'item',
            url: '/admin/sub-and-payments',
            icon: MdOutlinePayments,
            breadcrumbs: false
        },
        {
            id: 'game-catelogs',
            title: 'Game Catalogs',
            // type: 'item',
            icon: IoGameController,
            type: 'collapse',
            children: [
                {
                    id: 'play',
                    title: <FormattedMessage id="PlayStation" />,
                    type: 'item',
                    url: '/admin/playStation-games',
                    breadcrumbs: false,
                },
                {
                    id: 'xbox',
                    title: <FormattedMessage id="Xbox" />,
                    type: 'item',
                    url: '/admin/xbox-games',
                    breadcrumbs: false

                },
                {
                    id: 'steam',
                    title: <FormattedMessage id="Steam" />,
                    type: 'item',
                    url: '/admin/staem-games',
                    breadcrumbs: false

                },
                {
                    id: 'pc',
                    title: <FormattedMessage id="PC" />,
                    type: 'item',
                    url: '/admin/pc-games',
                    breadcrumbs: false

                },
                // {
                //     id: 'nintendo',
                //     title: <FormattedMessage id="Nintendo" />,
                //     type: 'item',
                //     url: '/admin/nintendo-games',
                //     breadcrumbs: false

                // },
                // {
                //     id: 'other',
                //     title: <FormattedMessage id="Other" />,
                //     type: 'item',
                //     url: '/admin/other-games',
                //     breadcrumbs: false

                // },
            ]
        },
        {
            id: 'pubg-games',
            title: 'PUBG Page',
            type: 'item',
            url: '/admin/pubg',
            icon: SiPubg,
            breadcrumbs: false
        },
        {
            id: 'steam-games',
            title: 'Steam Page',
            type: 'item',
            url: '/admin/steam',
            icon: FaSteam,
            breadcrumbs: false
        },
        {
            id: 'news-and-promotions',
            title: 'News and Promotions',
            type: 'item',
            url: '/admin/news-and-promotions',
            icon: IoNewspaper,
            breadcrumbs: false
        },
        {
            id: 'reviews',
            title: 'Reviews',
            type: 'item',
            url: '/admin/reviews',
            icon: MdRateReview,
            breadcrumbs: false
        },
        {
            id: 'seo-block',
            title: 'SEO Blocks',
            type: 'item',
            url: '/admin/seo-blocks',
            icon: MdOutlineScreenSearchDesktop,
            breadcrumbs: false
        },
        // {
        //     id: 'commission',
        //     title: 'Commission',
        //     type: 'item',
        //     url: '/admin/commission',
        //     icon: MdPaid,
        //     breadcrumbs: false
        // },
        {
            id: 'plugin',
            title: 'Plugins',
            type: 'item',
            url: '/admin/plugins',
            icon: BsPlugin,
            breadcrumbs: false
        },
        {
            id: 'logout',
            title: 'Logout',
            type: 'item',
            url: '/admin/logout',
            icon: RiLogoutBoxLine,
            breadcrumbs: false
        },

    ]
};

export default pages;
