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
            const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY, { expiresIn: 35})

            res.cookie(String(user._id), token, 
            {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'lax',
                expiresIn: new Date(Date.now() + 1000 * 30), //30 seconds  
            })
            .status(200).json({
                message: 'Login successfully',
                data: user.email,
                token: token,
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
        const userId = req.id;
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
        const cookie = req.headers.cookie;
        const token = cookie.split('=')[1]
        if(!token){
            res.status(401).send('Unauthorized: No token provided');
        }
        jwt.verify(String(token), process.env.TOKEN_KEY, (err, user) => {
            if(err){
                console.log(err)
                return res.status(401).send('Unauthorized');
            }
            req.id = user.id;
            next();
        });
    }
    catch(err){
        return res.status(401).json({
            message: 'Unauthorized: Invalid or expired token',
            error: true,
            success: false
        });
    }
}

const refreshToken = (req, res, next) => {
    try{
        const cookies = req.headers.cookie;
        const prevToken = cookies.split('=')[1];

        if(!prevToken){
            res.status(400).json({
                message: "Couldn't find token",
                error: true,
                success: false
            })
        }
        jwt.verify(String(prevToken), process.env.TOKEN_KEY, (err, user) => {
            if(err){
                res.status(403).json({
                    message: 'Unauthorized: Invalid or expired token',
                    error: true,
                    success: false
                })
            }
            res.clearCookie(`${user.id}`);
            req.cookies[`${user.id}`];

            const token = jwt.sign({id: user.id}, process.env.TOKEN_KEY, {
                expiresIn: '30s'
            });
            
            res.cookie(String(user.id), token, 
            {
                httpOnly: true,
                secure: true,
                path: '/',
                expiresIn: new Date(Date.now() + 1000 * 30), //30 seconds  
            })
            req.id = user.id;
            next();
        })
    }
    catch(err){
        res.status(403).json({
            message: 'Unauthorized: Invalid or expired token',
            error: true,
            success: false
        })
    }
}

const userLogoutController = async (req, res) => {

    try{
        const user = await UserModel.findById(req.id, 'name email').exec();
        
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`];
        res.status(200).json({
            data: user.name,
            message: 'User successfully logged out!',
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

module.exports = {
    userLoginController,
    userSignupController,
    userLogoutController,
    verifyToken,
    refreshToken,
    userPageController
}