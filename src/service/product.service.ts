import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export async function findAllProducts (){
    return ProductModel.find();
}

export async function createProduct (product: DocumentDefinition<ProductDocument>){
    return ProductModel.create(product);
};

export async function findProduct (query: FilterQuery<ProductDocument>, options: QueryOptions = {lean: true}){
    return ProductModel.findOne(query, {} ,options);
};

export async function findProductAndUpdate(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions = {new: true}){
    return ProductModel.findOneAndUpdate(query, update, options);
};

export async function findProductAndDelete(query: FilterQuery<ProductDocument>){
    return ProductModel.findOneAndDelete(query);
};

