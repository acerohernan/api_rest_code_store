import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { findUserById } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

export async function requireAuth (req: Request, res: Response, next: NextFunction){
    const accessToken = get(req, "headers.authorization", "").replace("Bearer ", "");

    if(!accessToken){
        return res.status(401).json({
        message: 'Not authorized',
        success: false,
        })
    };

    const {decoded} = verifyJwt(accessToken);

    const user = await findUserById(get(decoded, "_id"));

    if(!user){
        return res.status(401).json({
        message: 'User not found.',
        success: false,
        })
    }

    next();
};