const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String, 
    },
    storyImages: {
        type: Array,
        require: true
    },
    // sort: {
    //     type: Number
    // },
    // region: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Region'
    // }
},{timestamps: true})

const Story = mongoose.model('Story', storySchema)

module.exports = Story