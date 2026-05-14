import { Router, Request, Response} from "express";
import { Prisma } from "../db";
import { USERS, BALANCES } from "../state";
import { signupSchema, signinSchema } from "../schemas/auth"

import { User } from "../types";
import { z } from "zod";

const router = Router();

router.post("/signup", async(req: Request, res: Response)=>{
    try{
        const parsed = signupSchema.safeParse(req.body);

        if(!parsed.success){
           return res.status(400).json({
            error: parsed.error.issues
           })
        }

        const { email, password } = parsed.data;

        const user = await Prisma.user.create({
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

        BALANCES[user.id] = {
            INR: { available: 1000 , locked: 0 }
        }

        res.status(200).json({
            message: "User has been created",
             userId: user.id
        })
    }catch(error: any){
        if(error instanceof Prisma.PrismaClientKnownRequestError)
        if(error.code == "P2002"){
          return  res.status(400).json({
                error: "Email already exists"
            })
        }
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})




//SIGNIN
router.post("/signin",async (req: Request, res: Response) =>{
    
    try{
        const parsed = signinSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                error: parsed.error.issues 
            })
        }

        const { email, password } = parsed.data;
        
        const user = await Prisma.user.findUnique({
            where:{email}
         })
        if(!user){
            return res.status(401).json({
                error:"Invalid email or password"
            })
        }

        if(user.password !== password){
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        return res.json({
            message: "Signin successful",
            userId: user.id
        });

    }catch(error){
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
});


export default router;