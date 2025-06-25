import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        fristName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            trim: true
        },
        lastName: {
            type: String,
            trim: true,
            require: true
        },
        mobile: {
            type: Number,
            trim: true,
            unique: true,
            minlength: 10,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password are required"]
        },
        confromPassword: {
            type: String,
            required: true
        }

    }, {
    Timestamp: true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){return next()}
    this.password =bcrypt.hash(this.password,8)
    next()

})
userSchema.method.isPasswordCorrect =async function(password) {
    return await bcrypt.compare(password,this.password)

}

userSchema.method.generateAccessToken= function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}



export const User = mongoose.model("User", userSchema)