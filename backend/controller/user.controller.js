import { User } from "../models/user.model.js"
import ApiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { option } from "../utils/option.js"

// create accesstoken and refreshtoken
const generateAccessTokenAndRefreshToken = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = User.generateAccessToken()
        const refreshToken = User.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error getting tokens ");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body

    if (
        [fullname, email, password].some(field => field.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required");
    }

    // Proceed with user registration logic
    const existingUser = await User.findOne({
        $or: [{ email }]
    })
    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: fullname.toLowerCase(), // or get username from req.body
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "User registration failed")
    }
    return res.status(200).
        json(new ApiResponse(200, createdUser, "User registered successfully"))



})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email or password is required");
    }
    const userfind = await User.findOne({
        $or: [{ email }]

    })
    if (!userfind) {
        throw new ApiError(404, "User does  not exist")
    }
    const verifyPassword = await userfind.isPasswordCorrect(password)
    if (!verifyPassword) {
        throw new ApiError(401, "password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(userfind._id);

    const userLoggedin = await User.findById(userfind._id).select(
        "-password -refreshToken"
    )
    console.log("User login succesfully", userLoggedin)

    return res
        .status(200).
        cookie("refreshToken", refreshToken, option).
        cookie("accessToken", accessToken, option).
        json(
            new ApiResponse(200,
                { user: userLoggedin, accessToken, refreshToken },
                "user logged in successfully"
            )
        )
})

export { registerUser, loginUser }