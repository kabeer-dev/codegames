require("dotenv").config();
const express = require("express");
const { handleResponse } = require('../utils/responses')
const Region = require("../models/region");
const Currency = require("../models/currency");
const Story = require("../models/story");
const Banner = require("../models/banner");
const FastCategory = require("../models/fastCategory");
const PopularService = require('../models/popularService')
const MobileGame = require('../models/mobileGame')
const SubAndPaymentCard = require('../models/subAndPaymentCard')
const Playstation = require('../models/playstation')
const Xbox = require('../models/xbox')
const Steam = require('../models/steam')
const Pc = require('../models/pc')
// const Nintendo = require('../models/nintendo')
// const Other = require('../models/other')
const PubgPage = require('../models/pubgPage')
const SteamPage = require('../models/steamPage')
const News = require("../models/news");
const Review = require("../models/review");
const SeoBlock = require("../models/seoBlock");

exports.getRegionsAndCurrencies = async (req, res) => {
  const regions = await Region.find().select('_id name flg').sort('sort');
  const currencies = await Currency.find().select('_id name').sort('sort');
  handleResponse(res, { regions: regions, currencies: currencies })
};

exports.getStories = async (req, res) => {
  const stories = await Story.find();
  handleResponse(res, { stories: stories })
};

exports.getBanner = async (req, res) => {
  const getBanners = await Banner.find().populate('regions')
  handleResponse(res, { getBanners: getBanners })
};

exports.getfastCategories = async (req, res) => {
  const get_fast_categories = await FastCategory.find().populate('products.product');
  handleResponse(res, { results: get_fast_categories })
};

exports.getPopularServices = async (req, res) => {
  const get_popular_services = await PopularService.find().populate('products.product');
  handleResponse(res, { results: get_popular_services })
}

exports.getMobileAndSubGames = async (req, res) => {
  const get_mobile_games = await MobileGame.find().populate('products.product');
  const get_sub_games = await SubAndPaymentCard.find().populate('products.product');
  handleResponse(res, { mobile_results: get_mobile_games, sub_results: get_sub_games })
}

exports.getGameCatalogProducts = async (req, res) => {
  // const get_play4 = await Playstation4.find().populate('products.product');
  // const get_play5 = await Playstation5.find().populate('products.product');
  const get_play4and5 = await Playstation.find().populate('products.product');
  const get_xbox = await Xbox.find().populate('products.product');
  const get_steam = await Steam.find().populate('products.product');
  const get_pc = await Pc.find().populate('products.product');
  // const get_nintendo = await Nintendo.find().populate('products.product');
  // const get_other = await Other.find().populate('products.product');
  handleResponse(res, { play4and5_results: get_play4and5, xbox_results: get_xbox, steam_results: get_steam, pc_results: get_pc })
}

exports.getPubgPageProducts = async (req, res) => {
  const get_pubg_page_product = await PubgPage.find().populate('products.product');
  handleResponse(res, { results: get_pubg_page_product })
}

exports.getSteamGiftCardProducts = async (req, res) => {
  const get_steam_gift_card_product = await SteamPage.find().populate('products.product');
  handleResponse(res, { results: get_steam_gift_card_product })
}

exports.getnews = async (req, res) => {
  const get_news = await News.find().populate('product');
  handleResponse(res, { results: get_news })
};

exports.getReviews = async (req, res) => {
  const get_reviews = await Review.find().sort('sort');
  handleResponse(res, { results: get_reviews })
};

exports.getSeoBlocks = async (req, res) => {
  const get_scoBlocks = await SeoBlock.find().sort('sort');
  handleResponse(res, { results: get_scoBlocks })
};


