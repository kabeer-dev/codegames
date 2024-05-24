const connectToMongoDb = require('../config/config');
const User = require('../models/user');
const Region = require('../models/region');
const Banner = require('../models/banner');
const Currency = require('../models/currency');
const Plugin = require('../models/plugin');
const DropdownItem = require('../models/dropdownItem');
const { adminData, regionData, currencyData, pluginData, dropDownItemData } = require('./seederData')

const adminSeeder = async () => {
    try {
        await User.deleteMany();
        await User.create(adminData);
        console.log('Admin data seeded successfully');
    } catch (err) {
        console.log('Error while adding admin data:', err);
    }
}
const regionSeeder = async () => {
    try {
        await Banner.deleteMany();
        await Region.deleteMany();
        await Region.create(regionData);
        console.log('Region data seeded successfully');
    } catch (err) {
        console.log('Error while adding region data:', err);
    }
}
const currencySeeder = async () => {
    try {
        await Currency.deleteMany();
        await Currency.create(currencyData);
        console.log('Currency data seeded successfully');
    } catch (err) {
        console.log('Error while adding currency data:', err);
    }
}
const pluginSeeder = async () => {
    try {
        await Plugin.deleteMany();
        await Plugin.create(pluginData);
        console.log('Plugun data seeded successfully');
    } catch (err) {
        console.log('Error while adding plugin data:', err);
    }
}
const dropdownItemSeeder = async () => {
    try {
        await DropdownItem.deleteMany();
        await DropdownItem.create(dropDownItemData);
        console.log('Dropdown data seeded successfully');
    } catch (err) {
        console.log('Error while adding plugin data:', err);
    }
}
const seeders = async () => {
    try {
        await connectToMongoDb();
        await adminSeeder();
        await regionSeeder();
        await currencySeeder();
        await pluginSeeder();
        await dropdownItemSeeder();
        process.exit();
    } catch (err) {
        console.log('Error in seeders:', err);
        process.exit(1); // Exit with error code 1
    }
}
seeders();

