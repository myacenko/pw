const mongoose = require('mongoose')
const getCallSchema = new mongoose.Schema({
    userPhone: { type: String, required: true },
    getCall: { type: Boolean, required: true }
}, { collection: 'getCall' })

const model = mongoose.model('getCallSchema', getCallSchema)
module.exports = model