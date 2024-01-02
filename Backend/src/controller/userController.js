const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError=require('../utils/ApiError');
const register = async (req, res,next) => {
    try {
        console.log(req.body);
       
        if (req.body) {
            console.log(req.body)
            const newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            })
            await newUser.save()
            res.status(200).json({ "message": "User is successful registered" });

        }
        else {
           throw new ApiError( "user is not successful registered",404);
        }
    }
    catch (e) {
        let errorMessage = "";
        const errorDetails = e.errors;
        for (let i in errorDetails) {
            errorMessage+= errorDetails[i]+"\n"
        }
        if(errorMessage.length>0) {
        next( new ApiError(JSON.stringify(errorDetails),404)); //just this line
            }
    }
}
const login = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        // Checking if the user exists or not
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed! Email does not exist.' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } }, { new: true });
            const option = {
                maxAge: 3600000,
                httpOnly: true,
                secure: true,
                sameSite: 'None', // Adjust based on your requirements

            }
            const data = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                "userId": user._id
            }
            res.cookie("accessToken", accessToken, option);
            res.cookie("refreshToken", refreshToken, option);

            res.status(200).json(data)
        }
        else {
            return res.status(401).send({ message: 'Authentication failed! Wrong Password' });
        }
    }
})

const logout = asyncHandler(async (req, res) => {
    const id = req.user.id;
    console.log(req.user)
    const user = await User.findByIdAndUpdate(id, { $set: { refreshToken: null } }, { new: true });
    const option = {
        maxAge: 0,
        httpOnly: true,
        secure: true
    }
    
    res.cookie('accessToken', null, option)
    res.cookie('refreshToken',null,option)
    res.status(201).json({message:"Log out user"})


    res.status(200).send(user);
});

const refreshTokenAccess = asyncHandler(async (req, res) => {
    console.log("I am here");
    let { refreshToken } = req.body;
    console.log(refreshToken);
    try {
        if (!refreshToken) {
            res.status(401).send("No Refresh Token is sent");
            return;
        }

        const payload = await jwt.verify(refreshToken, process.env.RefreshTokenPassword);
        if (!payload) {
            res.status(401).send("Invalid Refresh Token");
            return;
        }

        const user = await User.findOne({ _id: payload.id });
        if (!user) {
            res.status(401).send("User Not Found");
            return;
        }

        if (user.refreshToken !== refreshToken) {
            throw new ApiError("Token mismatch",404);
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken(); // Assuming you have a method to generate a new refresh token
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            userId: user._id
        });
    } catch (e) {
        console.log(e);
        res.status(401).send("Error refreshing token");
    }
});


module.exports = { register, login, logout,refreshTokenAccess };