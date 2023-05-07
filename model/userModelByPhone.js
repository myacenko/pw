const mongoose = require('mongoose')
const UserByPhoneSchema = new mongoose.Schema({
    inputNumberVal: { type: String, required: true }
}, { collection: 'usersByPhone1' })

const model = mongoose.model('UserByPhoneSchema', UserByPhoneSchema)
module.exports = model