import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
}, {timestamps: true, versionKey: false});

export default model("user", userSchema);