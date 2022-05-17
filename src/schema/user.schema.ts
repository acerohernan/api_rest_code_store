import { object, string } from "zod"

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: "Name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: "Password Confirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Passwords do not match"
    }),
})