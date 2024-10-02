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
            const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_KEY);

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
        const hashedPassword = await bcrypt.hashSync(password, salt)

        if(!hashedPassword){
            throw new Error('Something went wrong  !')
        }
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
        res.json({
            user: null,
            message: err.message || err,
            success: false,
            error: true
        })
        
    }
}

const userPageController = async(req, res) => {
    try{
        const userId = req.user._id;
        console.log("userId => ", userId);
        const user = await UserModel.findById(userId, 'name email').exec();
        if(!user){
            throw new Error('User not found');
        }
        res.status(200).json({
            data: user.name,
            message: 'User page successfully loaded!',
            success: true,
            error: false
        })
    }
    catch(err){
        res.status(500).json({
            user: null,
            message: err.message || err,
            success: false,
            error: true
        })
    }

}

const verifyToken = async(req, res, next) => {
    try{
        const token = req.cookies['auth-token']; 
        if(!token){
            res.status(401).send('Unauthorized: No token provided');
        }



        console.log('in verify, request path:', req.path)  
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
        if (decoded){
            req.user = decoded.tokenData;
            next();
        }
        else{
            res.status(401).send('Unauthorized');
        }
    }
    catch(err){
        return res.status(401).json({
            message: 'Unauthorized: Invalid or expired token',
            error: true,
            success: false
        });
    }
}

module.exports = {
    userLoginController,
    userSignupController,
    verifyToken,
    userPageController
}