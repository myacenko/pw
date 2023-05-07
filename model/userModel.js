const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    nameValue: { type: String, required: true },
    surNameValue: { type: String, required: true },
    phoneValue: { type: String, required: true, unique: true },
    emailValue: { type: String, required: true, unique: true },
    passwordValue: { type: String, required: true }
}, { collection: 'users' })

const model = mongoose.model('UserSchema', UserSchema)
module.exports = model