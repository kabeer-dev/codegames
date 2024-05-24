const express = require("express");
const router = express.Router();
const {
    getBanner,
    getRegionsAndCurrencies,
    getStories,
    getfastCategories,
    getPopularServices,
    getMobileAndSubGames,
    getGameCatalogProducts,
    getSteamGiftCardProducts,
    getPubgPageProducts,
    getnews,
    getReviews,
    getSeoBlocks
} = require('../controllers/nonAuth')

router.get('/get-region-currencies', getRegionsAndCurrencies);

router.get("/stories", getStories);

router.get('/get-banners', getBanner);

router.get("/fast-categories", getfastCategories);

router.get('/popular-services', getPopularServices)

router.get('/mobile-and-sub-games', getMobileAndSubGames)

router.get('/game-catalog-products', getGameCatalogProducts)

router.get('/steam-gift-card-products', getSteamGiftCardProducts)

router.get('/pubg-page-product', getPubgPageProducts)

router.get("/news", getnews);

router.get("/reviews", getReviews);

router.get("/seoBlock", getSeoBlocks);

module.exports = router;
