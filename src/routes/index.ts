import {Express, Request, Response} from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";

function routes(app: Express){
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
};

export default routes;