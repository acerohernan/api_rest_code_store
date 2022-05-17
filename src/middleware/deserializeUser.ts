import {Request, Response, NextFunction} from "express";
import {get} from "lodash";
import { deleteSessionByQuery, findSessionById, findSessionByQuery } from "../service/session.service";
import { findUserById } from "../service/user.service";
import { signJwt, verifyJwt } from "../utils/jwt";
import config from "config"; 
import c from "config";
import log from "../utils/logger";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    try{
        const accessToken = get(req, "headers.authorization", "").replace("Bearer ", "");
        const refreshToken = get(req, "headers.x-refresh", "").replace("Bearer ", "");

        if(!accessToken){
            return next();
        };

        const {decoded, expired} = verifyJwt(accessToken);

        if(decoded){

            const session = await findSessionByQuery({user: get(decoded, "_id")});
            
            if(get(decoded, "session") !== String(session?._id)){
                return res.status(400).json({
                    message: "Your session has been close. Please login again.",
                    success: false
                })
            };

            res.locals.user = decoded;
            return next();
        };

        const sessionIsFinished = () => {
            return res.status(401).json({
            message: "Your session is expired. Please logout and signin again.",
            success: false
            });
        };

        if(expired){
            if(!refreshToken) return sessionIsFinished();

            const refresh = verifyJwt(refreshToken);

            if(refresh.expired) return sessionIsFinished();

            if(!refresh.decoded && !get(refresh.decoded, "session", "")) return sessionIsFinished();

            const session = await findSessionById(get(refresh.decoded, "session"));

            if(!session || !session.valid) return sessionIsFinished();

            const user = await findUserById(session?.user);

            if(!user) return sessionIsFinished();

            const newAccessToken = signJwt({
                ...user, session: session?._id
            }, {expiresIn: config.get("accessTokenDuration")}) //15 minutes

            res.setHeader("x-access-token", newAccessToken);

            const result = verifyJwt(newAccessToken);
            res.locals.user = result.decoded;
        };

        next();

    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false
        })
    }
};