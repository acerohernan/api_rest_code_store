import { Request, Response } from "express"
import { omit } from "lodash";
import UserModel from "../models/user.model"
import { createUser } from "../service/user.service"
import log from "../utils/logger";

export async function createUserHandler(req: Request, res: Response){
    try{
        const user = await createUser(req.body);

        return res.status(200).json({
            message: "User created successfully",
            success: true,
            data: omit(user.toJSON(), "password")
        })
    }catch(e: any){
        log.error(e.message);
        return res.status(400).json({
            message: "Could not create the user",
            success: false
        })
    }
};