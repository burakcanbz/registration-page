const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        immutable: true
    },
    password: String,
    role: String,
    },
    {
        timestamps: true
    })

const UserModel = mongoose.model('User', userSchema);

exports.UserModel = UserModel; 