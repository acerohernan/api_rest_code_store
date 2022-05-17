import { omit } from "lodash";
import {DocumentDefinition, FilterQuery} from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    return UserModel.create(input);
};

export async function validatePassword({email, password}: {email: string, password: string}){
    const user = await UserModel.findOne({email});
    if(!user){
        return false
    };
    const isValid = await user.comparePassword(password);
    
    if(!isValid) return false;

    return omit(user.toJSON(), "password");
}

export async function findUserById(userId: string){
    return UserModel.findById(userId);
};

export async function findUserByQuery(query: FilterQuery<UserDocument>){
    return UserModel.findOne(query).lean();
};