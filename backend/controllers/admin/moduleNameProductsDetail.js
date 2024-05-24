const { handleResponse, handleError } = require('../../utils/responses')
const axios = require('axios')
const mongoose = require('mongoose')
const Product = require('../../models/product')
const DropdownItem = require('../../models/dropdownItem')

exports.getProductsWithModuleName = async (req, res) => {
    const modelName = req.query.moduleName;
    const Model = mongoose.model(modelName);
    try {
        const productsWithModule = await Model.find().populate('products.product');
        handleResponse(res, { results: productsWithModule });
    } catch (err) {
        console.log('Error', err);
        handleError(res, { 'Error': err })
    }
}
exports.updateParentMultiFastCategories = async (req, res) => {
    const body = req.body;
    const modelName = req.query.moduleName;
    const Model = mongoose.model(modelName);
    try {
        await Model.updateOne(
            { _id: body._id },
            {
                $set: {
                    name: body.name,
                    description: body.description,
                    thumnailImage: body.thumnailImage,
                    coverImages: body.coverImages
                }
            }
        );
        handleResponse(res, { message: 'Parent Data Updated Successfully' });
    } catch (err) {
        console.log('Error', err);
        handleError(res, { 'Error': err })
    }
};
exports.checkAddKinguinSingleProduct = async (req, res) => {
    const body = req.body;
    try {
        const response = await axios.get(`${process.env.KINGUIN_API_URL}/v2/products/${body.productId}`, {
            headers: {
                'X-Api-Key': `${process.env.KINGUIN_API_KEY}`
            }
        });
        if (response.status === 200) {
            let fullProduct = ''
            let pPrice = ''
            const checkProduct = await Product.findOne({ productId: body.productId });
            if (!checkProduct) {
                const new_product = await Product.create(response.data);
                // _id = new_product._id.toString();
                // pPrice = new_product.price
                fullProduct = new_product
            } else {
                // _id = checkProduct._id.toString();
                // pPrice = checkProduct.price
                fullProduct = checkProduct
            }
            handleResponse(res, { fullProduct: fullProduct })
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        handleError(res, { message: 'Product not Founded' })
    }
}
exports.updateDenominationsProductFastCategory = async (req, res) => {
    const body = req.body;
    const _id = req.query._id;
    const modelName = req.query.moduleName;
    const Model = mongoose.model(modelName);
    try {
        await Model.updateOne({ _id: _id }, {
            products: body.products
        });
        handleResponse(res, { message: 'Denomination Updated Successfully' });
    } catch (err) {
        console.log('Error', err);
        handleError(res, { 'Error': err })
    }
}
exports.deleteProductWithModuleName = async (req, res) => {
    const body = req.body;
    const modelName = req.query.moduleName;
    const Model = mongoose.model(modelName);
    try {
        await Model.deleteOne({ _id: body.id });
        if (modelName === 'PubgPage' || modelName === 'SteamPage') {
            await DropdownItem.updateOne({ name: modelName }, {
                $set: {
                    isShow: true
                }
            })
        }
        handleResponse(res, { message: 'Product Deleted Successfully' });
    } catch (err) {
        console.log('Error', err);
        handleError(res, { 'Error': err })
    }
}