const { UserModel } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userLoginController = async(req, res) => {
    try{
        const {email, password} = req.body.data;
        const user = await UserModel.findOne({email});

        if(!user){
            throw new Error('User not found');
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        
        if(comparedPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = jwt.sign({tokenData}, process.env.TOKEN_KEY, { expiresIn: 35})
            res.cookie('auth-token', token, {httpOnly: true, secure: true}).status(200).json({
                message: 'Login successfully',
                data: token,
                success: true,
                error: false
            })
        }
        else{
            throw new Error('Check password.')
        }

    }
    catch(err){
        res.json({
            message: err.msg || err,
            success: false,
            error: true
        })
    }
}

const userSignupController = async(req, res) => {
    try{
        const { name, email, password} = req.body.data;
        
        const user = await UserModel.findOne({email});
        if(user){
            throw new Error('User aldready exist!');
        }
        if(!name){
            throw new Error('Please provide valid name!');
        }
        if(!email){
            throw new Error('Please provide valid email');
        }
        if(!password){
            throw new Error('Please provide valid password');
        }
        
        const salt =  bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt, (err, res) => {
            if(err){
                throw new Error('Something went wrong about your password')
            }
        })

        const payload = {
            name,
            email,
            password: hashedPassword,
            role: 'GENERAL'
        }
        const newUser = UserModel(payload);
        await UserModel.create(newUser);

        res.status(201).json({
            data: newUser,
            message: 'User created successfully!',
            success: true,
            error: false
        })

    }
    catch(err){
        res.status().json({
            user: null,
            message: err.message || err,
            success: false,
            error: true
        })
        
    }
}

module.exports = {
    userLoginController,
    userSignupController
}