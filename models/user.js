const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        // имя
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    about: {
        // о себе
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    avatar: {
        // ссылка на аватарку
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('user', userSchema)
