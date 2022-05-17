import { Request, Response } from "express";
import { omit } from "lodash";
import { createSession, deleteSessionByQuery, findSessionById, findSessionByQuery } from "../service/session.service";
import { createUser, findUserByQuery, validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt";
import log from "../utils/logger";
import config from "config";

export async function signInHandler(req: Request, res: Response){
    try{    
        const {email} = req.body;
        const userExists = await findUserByQuery({email});

        if(userExists){
           return res.status(400).json({
            message: "The email is taken",
            success: false
            }) 
        };

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

export async function createSessionHandler(req: Request, res: Response) {

    try{

    //Validate user password
    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password",
            success: false
        })
    }   

    //Verify if the user have an active session
    const isActive = await findSessionByQuery({user: user._id});
    
    if(isActive){
        return res.status(498).json({
            message: "An active session exists",
            success: false,
            data: user._id
        })
    };

    //Create a session
    const session = await createSession(user._id, req.get("user-agent") || "")    
    
    //Create tokens
    const accessToken = signJwt({
        ...user,
        session: session._id
    }, {  expiresIn: config.get("accessTokenDuration")}); // 15 minutes
    
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenDuration")} //  1 year
    ); 

    return res.status(200).json({
        message: "Signin successfully",
        success: true,
        data: {
            accessToken,
            refreshToken
        }
    });

    }catch (e: any){
        log.error(e.message|| e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false
        })
    }
};  

export async function closeSessionHandler(req: Request, res: Response){
    try{
        const {userId} = req.body;

        const session = await findSessionByQuery({user: userId});

        if(!session){
            return res.status(500).json({
            message: "Cloud not find an active session",
            success: false
            })
        };

        await deleteSessionByQuery({user: userId});
    
        return res.status(200).json({
            message: "Signed out successfully",
            success: true,
        });

    }catch (e: any){
        log.error(e.message|| e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false
        })
    }
};