import { object, string } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Please enter a valid email"),
        password: string({
            required_error: "Password is required"
        })
    })
});

export const closeSessionSchema = object({
    body: object({
        userId: string({
            required_error: "User id is required",
        })
    })
});