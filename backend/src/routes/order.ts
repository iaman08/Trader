import { Router, Request, Response } from "express";
import { ORDERBOOK,BALANCES, ORDERS } from '../state';
import { randomUUID } from "crypto"; 
import { orderSchema } from "../schemas/order"
const router = Router();

router.post("/order", async(req: Request, res: Response)=>{
    try{
    const parsed = orderSchema.safeParse(req.body);
    const { userId, side, price, symbol , quantity, type } = req.body;
    
    //userId validation
    
    }catch(error){
        
    }
})