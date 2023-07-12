import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true, versionKey: false});

export default model("categorie", categorySchema);