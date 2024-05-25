const { handleResponse, handleError } = require('../../utils/responses')
const axios = require('axios')
const mongoose = require('mongoose')
const Product = require('../../models/product')
const DropdownItem = require('../../models/dropdownItem')

exports.getDropdownItems = async (req, res) => {
    const dropdown_items = await DropdownItem.find({ isShow: true }).sort('sort');
    handleResponse(res, { results: dropdown_items })
}
exports.getKinguinSingleProduct = async (req, res) => {
    const body = req.body;
    const checkProduct = await Product.findOne({ productId: body.productId });
    if (checkProduct) {
        _id = checkProduct._id.toString();
        handleResponse(res, { _id: _id })
    }
    else {
        try {
            const response = await axios.get(`${process.env.KINGUIN_API_URL}/v2/products/${body.productId}`, {
                headers: {
                    'X-Api-Key': `${process.env.KINGUIN_API_KEY}`
                }
            });
            if (response.status === 200) {
                let _id = ''
                const new_product = await Product.create(response.data);
                _id = new_product._id.toString();
                handleResponse(res, { _id: _id })
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            handleError(res, { message: 'Product not Founded' })
        }

        console.log('noooo')
    }

}
exports.addKinguinSingleProductDetail = async (req, res) => {
    const body = req.body;
    const _id = req.query._id;
    try {
        body.options.forEach(async (element) => {
            const getProduct = await Product.findOne({ _id: _id });
            const modelName = element.name;
            const Model = mongoose.model(modelName);
            let cPrice = ''
            if (body.commission) {
                cPrice = calculateTotalPrice(getProduct.price, body.commission).toFixed(2);
            }
            await Model.create({
                products: [{
                    product: _id,
                    customPrice: cPrice && body.commission ? (cPrice) : (body.customPrice),
                }],
            })
        });
        handleResponse(res, { message: "Products Added Successfully" })
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
exports.addKinguinDnominationProductsDetail = async (req, res) => {
    const body = req.body;
    let productsData = []
    for (const element of body.data.products) {
        try {
            const getProduct = await Product.findOne({ _id: element.product });
            let customPrice = element.customPrice;
            if (element.commission) {
                const commissionPrice = calculateTotalPrice(getProduct.price, element.commission);
                customPrice = commissionPrice.toFixed(2);
            }

            productsData.push({ product: element.product, customPrice });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    try {
        body.options.forEach(async (element, index) => {
            const modelName = element.name;
            const Model = mongoose.model(modelName);
            await Model.create({
                name: body.data.name,
                description: body.data.description,
                thumnailImage: body.data.thumnailImage,
                coverImages: body.data.coverImages,
                singleProduct: false,
                products: productsData
            })
            if (element.name === 'PubgPage') {
                await DropdownItem.updateOne({ name: element.name }, {
                    $set: {
                        isShow: false
                    }
                })
            }
            if (element.name === 'SteamPage') {
                await DropdownItem.updateOne({ name: element.name }, {
                    $set: {
                        isShow: false
                    }
                })
            }
        });
        handleResponse(res, { message: "Products Added Successfully" })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Funtion for getting Total Price with price and commission
function calculateTotalPrice(basePrice, commissionPercentage) {
    const commissionAmount = (commissionPercentage / 100) * basePrice;
    const totalPrice = basePrice + commissionAmount;
    return totalPrice;
}