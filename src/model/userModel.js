const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String
        },
        coverPicture: {
            type: String
        },
        followers: {
            type: Number
        },
        followings: {
            type: Number
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
        },
        city: {
            type: String,
        },
        from: {
            type: String,
        },
        relationship: {
            type: String,
            enum: ["Single", "married"]
        },
        isDeleted: {
            type: Boolean,
            default: false

        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);