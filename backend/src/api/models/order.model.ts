import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {timestamps: true, versionKey: false});

export default model("order", orderSchema);