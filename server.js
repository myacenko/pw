const path = require('path')
const express = require('express')
const userModel = require('./model/userModel')
const userModelByPhone = require('./model/userModelByPhone')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const JWTSECRET = 'sdshdsjaijdsajkdakjslfdsadkjadsadadadasa'
app = express()
try {
    mongoose.connect('mongodb+srv://admin:771Moe33@cluster0.yqeqbpb.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch {
    console.log('error mongoConnect')
}

app.use(bodyParser.json())

app.listen(3000, () => {
    console.log("Server started")
})

app.use('/', express.static(path.join(__dirname, 'static')))

app.post('/api/register', async(req, res) => {
    const { nameValue, surNameValue, phoneValue, emailValue, passwordValue: pasPlain } = req.body

    const passwordValue = await bcryptjs.hash(pasPlain, 10)
        //Создание юзера
    try {
        const emailCheck = await userModel.findOne({ emailValue }).lean()
        if (!emailCheck) {
            const response = await userModel.create({
                nameValue,
                surNameValue,
                phoneValue,
                emailValue,
                passwordValue
            })
            console.log('UserCreated suc ' + response)
        } else {
            return res.json({ status: 'error', error: 'Login|Email already used' })
        }
    } catch (error) {
        console.log("Error than user create:" + error)
    }
    res.json({ status: 'ok' })
})
app.post('/api/registerByPhone', async(req, res) => {
    const { inputNumberVal } = req.body
    try {
        const response = await userModelByPhone.create({
            inputNumberVal
        })
        console.log('UserCreated suc ' + response)
    } catch (error) {
        console.log("Error than user create:" + error)
        return
    }
    res.json({ status: 'ok' })
})