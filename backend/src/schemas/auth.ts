import { z } from "zod";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export { signupSchema, signinSchema } ;