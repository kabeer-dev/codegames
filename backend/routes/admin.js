const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middlewares/validateRequest");
const { body } = require("express-validator");
const {
  getOrders,
  getTransactions,
  getRegions,
  getBanner,
  addBanner,
  updateBanner,
  deleteBanner,
  updateRegionHot,
  getStories,
  saveStory,
  updateStory,
  deleteStory,
  getCustomGames,
  addCustomGames,
  updateCustomGames,
  deleteCustomGames,
  getAllProducts,
  PopularProductHotChange,
  getReviews,
  addEditReview,
  deleteReview,
  getSeoBlocks,
  addSeoBlock,
  updateSeoBlock,
  deleteSeoBlock,
  getNews,
  saveNews,
  updateNews,
  deleteNews,
  getPlugins,
  updateKinguinPlugin,
  updateTazapayPlugin,
  updateWoopkassaPlugin,
  updateCitypayPlugin
} = require("../controllers/admin/admin");
const {
  getDropdownItems,
  getKinguinSingleProduct,
  addKinguinSingleProductDetail,
  addKinguinDnominationProductsDetail
} = require('../controllers/admin/addProduct');
const {
  getProductsWithModuleName,
  updateParentMultiFastCategories,
  checkAddKinguinSingleProduct,
  updateDenominationsProductFastCategory,
  deleteProductWithModuleName
} = require('../controllers/admin/moduleNameProductsDetail')

//orders
router.get("/get-orders", getOrders);

//transaction
router.get("/get-transactions", getTransactions);

//Stories
router.get("/stories", getStories);
router.post(
  "/save-story",
  [
    body('storyImages').isArray({ min: 1 }).withMessage('At least 1 Image is required'),
  ],
  validateRequest,
  saveStory
);
router.post(
  "/update-story",
  [
    body('storyImages').isArray({ min: 1 }).withMessage('At least 1 Image is required'),
  ],
  validateRequest,
  updateStory
);
router.post(
  '/delete-story',
  [
    body('story_id').notEmpty().withMessage('Story Id is required'),
  ],
  validateRequest,
  deleteStory
);

//Regions
router.get("/get-regions", getRegions);
router.post(
  '/update-region-hot',
  [
    body('region_id').notEmpty().withMessage('Region Id is required'),
  ],
  validateRequest,
  updateRegionHot
);

//Bannners
router.get(
  '/get-banners',
  getBanner
);
router.post(
  '/add-banner',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('regions').isArray({ min: 1 }).withMessage('At least 1 Region is required'),
    // body('sort').notEmpty().withMessage('Sort is required'),
    body('bannerImage').notEmpty().withMessage('Banner Image is required'),
  ],
  validateRequest,
  addBanner
);
router.post(
  '/update-banner',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('regions').isArray({ min: 1 }).withMessage('At least 1 Region is required'),
    // body('sort').notEmpty().withMessage('Sort is required'),
    body('bannerImage').notEmpty().withMessage('Banner Image is required'),
    body('smallScreenBannerImage').notEmpty().withMessage('Small Screen Banner Image is required'),
  ],
  validateRequest,
  updateBanner
);
router.post(
  '/delete-banner',
  [
    body('banner_id').notEmpty().withMessage('Banner Id is required'),
  ],
  validateRequest,
  deleteBanner
);

//custom Games
router.get('/get-custom-games', getCustomGames);
router.post(
  '/add-custom-game',
  [
    body('productId').notEmpty().withMessage('Product Id is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('totalQty').notEmpty().withMessage('Total Qty is required'),
    body('platform').notEmpty().withMessage('Platform is required'),
    body('activationDetails').notEmpty().withMessage('Activation Details is required'),
    body('systemRequirements').notEmpty().withMessage('System Requirments is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('coverImageOriginal').notEmpty().withMessage('Cover Image is required'),
    body('screenshots').isArray({ min: 1 }).withMessage('At least 1 Image is required'),
  ],
  validateRequest,
  addCustomGames
);
router.post(
  '/update-custom-game',
  [
    body('productId').notEmpty().withMessage('Product Id is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('totalQty').notEmpty().withMessage('Total Qty is required'),
    body('platform').notEmpty().withMessage('Platform is required'),
    body('activationDetails').notEmpty().withMessage('Activation Details is required'),
    body('systemRequirements').notEmpty().withMessage('System Requirments is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('coverImageOriginal').notEmpty().withMessage('Cover Image is required'),
    body('screenshots').isArray({ min: 1 }).withMessage('At least 1 Image is required'),
  ],
  validateRequest,
  updateCustomGames
);
router.post(
  '/delete-custom-games',
  [
    body('id').notEmpty().withMessage('Game Id is required'),
  ],
  validateRequest,
  deleteCustomGames
);

//populat hot change
router.post(
  '/popular-product-hot-change',
  [
    body('id').notEmpty().withMessage('Product Id is required'),
    body('isHot').notEmpty().withMessage('Hot is required'),
  ],
  validateRequest,
  PopularProductHotChange
);

//reviews
router.get('/get-reviews', getReviews)
router.post(
  '/add-edit-review',
  [
    body('userName').notEmpty().withMessage('User Name is required'),
    body('rating').notEmpty().withMessage('Rating is required'),
    body('message').notEmpty().withMessage('Message is required'),
    body('sort').notEmpty().withMessage('Sort is required'),
  ],
  validateRequest,
  addEditReview
)
router.post(
  '/delete-review',
  deleteReview
)

//seo block
router.get('/get-seo-block', getSeoBlocks)
router.post(
  '/add-seo-block',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('sort').notEmpty().withMessage('Sort is required'),
    body('image').notEmpty().withMessage('Image is required'),
  ],
  validateRequest,
  addSeoBlock
)
router.post(
  '/update-seo-block',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('sort').notEmpty().withMessage('Sort is required'),
    body('image').notEmpty().withMessage('Image is required'),
  ],
  validateRequest,
  updateSeoBlock
)
router.post('/delete-seo-block', deleteSeoBlock)

//news and promotions
router.get(
  "/get-news",
  getNews
);
router.post(
  "/save-news",
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('keyFeatures').isArray({ min: 1 }).withMessage('At least one Feature is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('coverImage').notEmpty().withMessage('Image is required'),
  ],
  validateRequest,
  saveNews
);
router.post(
  "/update-news",
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('keyFeatures').isArray({ min: 1 }).withMessage('At least one Feature is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('coverImage').notEmpty().withMessage('Image is required'),
  ],
  validateRequest,
  updateNews
);
router.delete("/delete-news", deleteNews);

//plugin
router.get('/get-plugins', getPlugins)
router.post(
  '/update-kinguin-plugin',
  [
    body('KINGUIN_API_URL').notEmpty().withMessage('Kinguin Api Url is required'),
    body('KINGUIN_API_KEY').notEmpty().withMessage('Kinguin Api Key is required'),
  ],
  validateRequest,
  updateKinguinPlugin
)
router.post(
  '/update-TAZAPAY-plugin',
  [
    body('TAZAPAY_API_URL').notEmpty().withMessage('Taza Pay Api Url is required'),
    body('TAZAPAY_PUBLIC_KEY').notEmpty().withMessage('Taza Pay Public Key is required'),
    body('TAZAPAY_API_KEY').notEmpty().withMessage('Taza Pay Api Key is required'),
    body('TAZAPAY_API_SECRET_KEY').notEmpty().withMessage('Taza Pay Api Secret Key is required'),
    body('TAZAPAY_BASE64_KEY').notEmpty().withMessage('Taza Pay Base64 Key is required'),
  ],
  validateRequest,
  updateTazapayPlugin
)
router.post(
  '/update-woopkassa-plugin',
  [
    body('WOOPKASSA_API_URL').notEmpty().withMessage('Woopkassa Api Url is required'),
    body('WOOPKASSA_LOGIN').notEmpty().withMessage('Woopkassa Login is required'),
    body('WOOPKASSA_PASSWORD').notEmpty().withMessage('Woopkassa Password is required'),
  ],
  validateRequest,
  updateWoopkassaPlugin
)
router.post(
  '/update-citypay-plugin',
  [
    body('CITYPAY_API_URL').notEmpty().withMessage('CityPay Api Url is required'),
    body('CITY_PAY_ORDER_API_URL').notEmpty().withMessage('CityPay Order Api Url is required'),
    body('CITYPAY_CUSTOMER_ID').notEmpty().withMessage('CityPay Customer Id is required'),
    body('CITY_USD_ACCESS_TOKEN').notEmpty().withMessage('CityPay USD Access Token is required'),
  ],
  validateRequest,
  updateCitypayPlugin
);

//common for get all products
router.get(
  '/get-all-products',
  getAllProducts
);

//Add Kinguin Product
router.get('/get-dropdown-items', getDropdownItems)
router.post(
  '/get-kinguin-single-product',
  [
    body('productId').notEmpty().withMessage('Product Id is required')
  ],
  validateRequest,
  getKinguinSingleProduct
)
router.post(
  '/add-kinguin-single-product-detail',
  [
    body('options').isArray({ min: 1 }).withMessage('At least one Option is required'),
  ],
  validateRequest,
  addKinguinSingleProductDetail
)
router.post(
  '/add-kinguin-denomination-products-detail',
  addKinguinDnominationProductsDetail
)

//Products for all modules
router.get('/get-products-with-module-name', getProductsWithModuleName);
router.post(
  '/update-parent-multi-with-module-name',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('thumnailImage').notEmpty().withMessage('Logo is required'),
    body('coverImages').isArray({ min: 1 }).withMessage('At least one Image is required'),
  ],
  validateRequest,
  updateParentMultiFastCategories
);
router.post(
  '/check-kinguin-single-product',
  [
    body('productId').notEmpty().withMessage('ProductId is required'),
  ],
  validateRequest,
  checkAddKinguinSingleProduct
);
router.post(
  '/update-denominations-product-with-module-name',
  validateRequest,
  updateDenominationsProductFastCategory
);
router.post(
  '/delete-Product-with-module-name',
  [
    body('id').notEmpty().withMessage('Id is required'),
  ],
  validateRequest,
  deleteProductWithModuleName
);

module.exports = router;
