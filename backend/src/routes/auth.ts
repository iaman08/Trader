import { Router, Request, Response} from "express";
import { prisma } from "../db";
import { USERS, BALANCES } from "../state";
import { User } from "../types";
import { randomUUID } from "crypto"; 
import { z } from "zod";

const router = Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

router.post("/signup", async(req: Request, res: Response)=>{
    try{
        const parsed = signupSchema.safeParse(req.body);

        if(!parsed.success){
           return res.status(400).json({
            error: parsed.error.issues
           })
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.create({
            data:{
                email,
                password,
                balances:{
                    create:{
                        asset: "INR",
                        available: 0,
                        locked: 0
                    }
                }
            }
        });

        res.status(200).json({
            message: "User has been created",
             userId: user.id
        })
    }catch(error){
        if(error == "P2002"){
          return  res.status(411).json({
                error: "Email already exists"
            })
        }
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

export default router;