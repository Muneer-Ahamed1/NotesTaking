const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true,"Please give a userName"],
        unique: true
    },
    email: {
        type: String,
        required: [true,"Please give a email"],
        validate:{
            validator:(value)=>{
                 // Use a regular expression to validate the email format
                 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                 return emailRegex.test(value);
            },
            message: 'Invalid email format. Please provide a valid email address.',

        },
        unique: true
    },
    password: {
        type: String,
        minlength: [6,'password should be atleast 6 words'] ,
        maxlength: [30,'password should be not exceed 30 words'], 
        required: [true,'please give a password']
    },
    role:{
        type:String,
        default:"user"
    },
    refreshToken:{
        type:String
    }
},{
    timestamps: true, 
  })
userSchema.pre('save', async function (next) {
    try {
        let salt = await bcrypt.genSalt()
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    }
    catch (e) {
        console.log(e);
    }
})

userSchema.methods.generateAccessToken = function () {
    const email = this.email
    const id = this._id;
    const payload = { email, id };
    const accessToken = jwt.sign(payload, process.env.AccessTokenPassword,{expiresIn:'60m'});
    return accessToken;
}

userSchema.methods.generateRefreshToken = function () {
    const email = this.email
    const id = this._id;
    const payload = { email, id };
    const refreshToken = jwt.sign(payload, process.env.RefreshTokenPassword, { expiresIn: '1200m' })
    return refreshToken;

}


module.exports = mongoose.model("User", userSchema);

