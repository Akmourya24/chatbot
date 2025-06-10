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
}


)

export const User = mongoose.model("User", userSchema)