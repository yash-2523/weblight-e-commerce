import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            fileName: {
                type: String,
            },
            timeStamp: {
                type: Date,
                default: Date.now(),
            }
        }
    ],
    description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categorie",
        required: true,
    },
}, {timestamps: true, versionKey: false});

export default model("product", productSchema);