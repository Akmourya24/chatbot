import { User } from "../models/user.model.js"
import ApiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        if (
            [firstname, lastname, email, password].some((field) => {
                (field.trim() === "")
            })
        ) {
            throw new ApiError(400, "all filed are reuqired")
        }

        // Proceed with user registration logic
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (existingUser) {
            throw new ApiError(400, "User already exists")
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            username: username.toLowerCase(),
        })

        const createdUser = await User.findById(user._id).select("-password")

        if (!createdUser) {
            throw new ApiError(500, "User registration failed")
        }
        return res.status(200).
            json(new ApiResponse(200, createdUser, "User registered successfully"))

        } catch (error) {
            throw new ApiError(
                error.statusCode || 500,
                error.message || "Internal Server Error"
            )

    }

})

export { registerUser }