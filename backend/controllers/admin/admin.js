require("dotenv").config()
const { handleResponse } = require('../../utils/responses')
const Order = require("../../models/order")
const Transaction = require("../../models/transaction")
const Story = require("../../models/story")
const Region = require("../../models/region")
const Banner = require("../../models/banner")
const Product = require("../../models/product")
const PopularService = require("../../models/popularService")
const Review = require("../../models/review")
const SeoBlock = require("../../models/seoBlock")
const News = require("../../models/news");
const Plugin = require("../../models/plugin")

//Orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  handleResponse(res, { results: orders });
};

//Transactions
exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  handleResponse(res, { results: transactions });
};

//Stroies
exports.getStories = async (req, res) => {
  const stories = await Story.find();
  handleResponse(res, { stories: stories });
};
exports.saveStory = async (req, res) => {
  const story = req.body;
  const createdStory = await Story.create(story);
  handleResponse(res, { message: 'Story Created Successfully' })

};
exports.updateStory = async (req, res) => {
  const story = req.body;
  const updatedStory = await Story.updateOne(
    { _id: story._id },
    {
      $set: {
        storyImages: story.storyImages
      }
    }
  );
  handleResponse(res, { message: 'Story Updated Successfully' })
}
exports.deleteStory = async (req, res) => {
  const body = req.body;
  const deteleStory = await Story.deleteOne({ _id: body.story_id });
  res.status(200).json(deteleStory);
};

//regions
exports.getRegions = async (req, res) => {
  const regions = await Region.find().sort('sort');
  handleResponse(res, { regions: regions })
};
exports.updateRegionHot = async (req, res) => {
  const body = req.body;
  const updateRegionHot = await Region.updateOne(
    { _id: body.region_id },
    {
      $set: {
        hot: body.hot
      }
    }
  );
  handleResponse(res, { message: "Region Updated Successfully" })
};

//banners
exports.getBanner = async (req, res) => {
  const getBanners = await Banner.find().populate('regions');
  handleResponse(res, { getBanners: getBanners })
};
exports.addBanner = async (req, res) => {
  const body = req.body;
  try {
    await Banner.create({
      title: body.title,
      bannerImage: body.bannerImage,
      smallScreenBannerImage: body.smallScreenBannerImage,
      regions: body.regions
    });
    handleResponse(res, { message: "Banner Add Successfully" })
  } catch (error) {
    console.error('Error in Regions:', error);
  }
  // if (body.swapId && body.swapSort) {
  //   await Banner.updateOne(
  //     { _id: body.swapId }, { $set: { sort: body.swapSort } }
  //   )
  // }
  // const addBanner = await Banner.create(body);
  // handleResponse(res, { message: "Banner Add Successfully" })
};
exports.updateBanner = async (req, res) => {
  const body = req.body;
  // if (body.swapId && body.swapSort) {
  //   await Banner.updateOne(
  //     { _id: body.swapId }, { $set: { sort: body.swapSort } }
  //   )
  // }
  const updateBanner = await Banner.updateOne(
    { _id: body._id },
    {
      $set: {
        title: body.title,
        regions: body.regions,
        // sort: body.sort,
        bannerImage: body.bannerImage,
        smallScreenBannerImage: body.smallScreenBannerImage,
      }
    }
  )
  handleResponse(res, { message: "Banner Updated Successfully" })
};
exports.deleteBanner = async (req, res) => {
  const body = req.body;
  const deleteBanner = await Banner.deleteOne({ _id: body.banner_id });
  handleResponse(res, { message: "Banner Successfully" })
};

//custom games
exports.getCustomGames = async (req, res) => {
  const getGames = await Product.find({ isCustom: true });
  handleResponse(res, { getCustomGames: getGames });
}

exports.addCustomGames = async (req, res) => {
  const game = req.body;
  try {
    await Product.create(game);
    handleResponse(res, { message: 'Game Added Successfully' });
  } catch (err) {
    console.log('Error', err)
  }
}
exports.updateCustomGames = async (req, res) => {
  const game = req.body;
  try {
    await Product.updateOne(
      { _id: game._id },
      {
        $set: {
          productId: game.productId,
          name: game.name,
          price: game.price,
          totalQty: game.totalQty,
          platform: game.platform,
          activationDetails: game.activationDetails,
          systemRequirements: game.systemRequirements,
          description: game.description,
          coverImageOriginal: game.coverImageOriginal,
          screenshots: game.screenshots
        }
      }
    );
    handleResponse(res, { message: 'Game Updated Successfully' });
  } catch (err) {
    console.log('Error', err)
  }
}
exports.deleteCustomGames = async (req, res) => {
  const body = req.body
  await Product.deleteOne({ _id: body.id });
  handleResponse(res, { message: 'Game Deleted Successfully' });
}

//popular services
exports.PopularProductHotChange = async (req, res) => {
  const body = req.body;
  await PopularService.updateOne(
    { _id: body.id },
    {
      $set: {
        isHot: body.isHot
      }
    }
  )
  handleResponse(res, { message: 'Change Successfully' })
}

//reviews
exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  handleResponse(res, { results: reviews })
}
exports.addEditReview = async (req, res) => {
  const review = req.body;
  if (review.swapId && review.swapSort) {
    await Review.updateOne(
      { _id: review.swapId }, { $set: { sort: review.swapSort } }
    )
  }
  if (!review._id) {
    await Review.create(review)
    handleResponse(res, { message: 'Review Added Successfully' })
  } else {
    await Review.updateOne(
      { _id: review._id },
      {
        $set: {
          userName: review.userName,
          rating: review.rating,
          message: review.message,
          sort: review.sort
        }
      }
    )
    handleResponse(res, { message: 'Review Updated Successfully' })
  }
}
exports.deleteReview = async (req, res) => {
  const review = req.body;
  await Review.deleteOne({ _id: review.id })
  handleResponse(res, { message: 'Review Deleted Successfully' })
}

//seo Block
exports.getSeoBlocks = async (req, res) => {
  const seoBlocks = await SeoBlock.find();
  handleResponse(res, { results: seoBlocks })
}
exports.addSeoBlock = async (req, res) => {
  const seoBlock = req.body;
  if (seoBlock.swapId && seoBlock.swapSort) {
    await SeoBlock.updateOne(
      { _id: seoBlock.swapId }, { $set: { sort: seoBlock.swapSort } }
    )
  }
  await SeoBlock.create(seoBlock)
  handleResponse(res, { message: 'SEO Block Added Successfully' })
}
exports.updateSeoBlock = async (req, res) => {
  const seoBlock = req.body;
  if (seoBlock.swapId && seoBlock.swapSort) {
    await SeoBlock.updateOne(
      { _id: seoBlock.swapId }, { $set: { sort: seoBlock.swapSort } }
    )
  }
  await SeoBlock.updateOne(
    { _id: seoBlock._id },
    {
      $set: {
        title: seoBlock.title,
        description: seoBlock.description,
        sort: seoBlock.sort,
        image: seoBlock.image
      }
    }
  )
  handleResponse(res, { message: 'SEO Block Updated Successfully' })

}
exports.deleteSeoBlock = async (req, res) => {
  const seoBlock = req.body;
  await SeoBlock.deleteOne({ _id: seoBlock.id })
  handleResponse(res, { message: 'SEO Block Deleted Successfully' })
}

//news and promotions
exports.getNews = async (req, res) => {
  const news = await News.find().populate({ path: 'product', select: '_id productId originalName name' });
  res.status(201).json(news);
};
exports.saveNews = async (req, res) => {
  const body = req.body;
  await News.create(body)
  handleResponse(res, { message: 'Added News Successfully' })
};
exports.updateNews = async (req, res) => {
  const body = req.body;
  await News.updateOne(
    { _id: body._id },
    {
      $set: {
        title: body.title,
        telegramUrl: body.telegramUrl,
        facebookUrl: body.facebookUrl,
        discordUrl: body.discordUrl,
        keyFeatures: body.keyFeatures,
        description: body.description,
        product: body.product,
        coverImage: body.coverImage
      }
    }
  )
  handleResponse(res, { message: 'Updated News Successfully' })
};
exports.deleteNews = async (req, res) => {
  const deleteNews = await News.deleteOne({ _id: req.body.news_id });
  res.status(200).json(deleteNews);
};

//plugins
exports.getPlugins = async (req, res) => {
  const getPlugins = await Plugin.find();
  handleResponse(res, { results: getPlugins })
};
exports.updateKinguinPlugin = async (req, res) => {
  const body = req.body;
  if (body._id) {
    await Plugin.updateOne(
      { _id: body._id },
      {
        $set: {
          KINGUIN_API_URL: body.KINGUIN_API_URL,
          KINGUIN_API_KEY: body.KINGUIN_API_KEY
        }
      }
    );
    handleResponse(res, { message: 'Kinguin Plugin updated Successfully' })
  } else {
    await Plugin.create({
      name: 'Kinguin',
      KINGUIN_API_URL: body.KINGUIN_API_URL,
      KINGUIN_API_KEY: body.KINGUIN_API_KEY
    })
    handleResponse(res, { message: 'Kinguin Plugin updated Successfully' })
  }

};

exports.updateTazapayPlugin = async (req, res) => {
  const body = req.body;
  if (body._id) {
    await Plugin.updateOne(
      { _id: body._id },
      {
        $set: {
          TAZAPAY_API_URL: body.TAZAPAY_API_URL,
          TAZAPAY_PUBLIC_KEY: body.TAZAPAY_PUBLIC_KEY,
          TAZAPAY_API_KEY: body.TAZAPAY_API_KEY,
          TAZAPAY_API_SECRET_KEY: body.TAZAPAY_API_SECRET_KEY,
          TAZAPAY_BASE64_KEY: body.TAZAPAY_BASE64_KEY
        }
      }
    );
    handleResponse(res, { message: 'Taza Pay Plugin updated Successfully' })
  } else {
    await Plugin.create({
      name: 'TazaPay',
      TAZAPAY_API_URL: body.TAZAPAY_API_URL,
      TAZAPAY_PUBLIC_KEY: body.TAZAPAY_PUBLIC_KEY,
      TAZAPAY_API_KEY: body.TAZAPAY_API_KEY,
      TAZAPAY_API_SECRET_KEY: body.TAZAPAY_API_SECRET_KEY,
      TAZAPAY_BASE64_KEY: body.TAZAPAY_BASE64_KEY
    })
    handleResponse(res, { message: 'Taza Pay Plugin updated Successfully' })
  }

};
exports.updateWoopkassaPlugin = async (req, res) => {
  const body = req.body;
  if (body._id) {
    await Plugin.updateOne(
      { _id: body._id },
      {
        $set: {
          WOOPKASSA_API_URL: body.WOOPKASSA_API_URL,
          WOOPKASSA_LOGIN: body.WOOPKASSA_LOGIN,
          WOOPKASSA_PASSWORD: body.WOOPKASSA_PASSWORD,
        }
      }
    );
    handleResponse(res, { message: 'Woopkassa Plugin updated Successfully' })
  } else {
    await Plugin.create({
      name: 'Woopkassa',
      WOOPKASSA_API_URL: body.WOOPKASSA_API_URL,
      WOOPKASSA_LOGIN: body.WOOPKASSA_LOGIN,
      WOOPKASSA_PASSWORD: body.WOOPKASSA_PASSWORD,
    })
    handleResponse(res, { message: 'Woopkassa Plugin updated Successfully' })
  }

};
exports.updateCitypayPlugin = async (req, res) => {
  const body = req.body;
  if (body._id) {
    await Plugin.updateOne(
      { _id: body._id },
      {
        $set: {
          CITYPAY_API_URL: body.CITYPAY_API_URL,
          CITY_PAY_ORDER_API_URL: body.CITY_PAY_ORDER_API_URL,
          CITYPAY_CUSTOMER_ID: body.CITYPAY_CUSTOMER_ID,
          CITY_USD_ACCESS_TOKEN: body.CITY_USD_ACCESS_TOKEN,
        }
      }
    );
    handleResponse(res, { message: 'CityPay Plugin updated Successfully' })
  } else {
    await Plugin.create({
      name: 'CityPay',
      CITYPAY_API_URL: body.CITYPAY_API_URL,
      CITY_PAY_ORDER_API_URL: body.CITY_PAY_ORDER_API_URL,
      CITYPAY_CUSTOMER_ID: body.CITYPAY_CUSTOMER_ID,
      CITY_USD_ACCESS_TOKEN: body.CITY_USD_ACCESS_TOKEN,
    })
    handleResponse(res, { message: 'CityPay Plugin updated Successfully' })
  }
};

//common for get all products
exports.getAllProducts = async (req, res) => {
  const getAllProducts = await Product.find().select('_id name originalName productId isPopular isMobileGame isSubAndPayCard platform customPlatform');
  handleResponse(res, { getAllProducts: getAllProducts })
}
