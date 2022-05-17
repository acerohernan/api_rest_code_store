import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 6);

export interface ProductDocument extends mongoose.Document{
    name: String;
    code: String;
    category: String;
    price: number;
    stars: number;
    description: string;
    image_url: string;
    createdAt: Date;
    updatedAt: Date;
};

const productSchema = new mongoose.Schema(
    {   
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String, 
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category"
        },
        price: {
            type: Number,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image_url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;