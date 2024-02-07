import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;