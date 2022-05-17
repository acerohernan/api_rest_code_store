import {Express, Request, Response} from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import productRouter from "./product.route";

function routes(app: Express){
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/product', productRouter);
};

export default routes;