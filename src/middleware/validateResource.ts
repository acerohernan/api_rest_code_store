import { NextFunction, Request, Response } from "express";
import { result } from "lodash";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try{
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })

        next();
    }catch (e: any){
        return res.status(400).json({
            message: e.errors[0].message || "Petición inválida",
            success: false,
        })
    }
};

export default validate;