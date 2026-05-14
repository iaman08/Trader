import { z } from "zod";

export const orderSchema = z.object({
    userId: z.string(),
    side: z.enum(["BUY", "SELL"]),
    type: z.enum(["MARKET", "LIMIT"]),
    price: z.number().positive(),
    symbol: z.string(),
    qty: z.number().positive().optional()
}).refine((data)=>{
    if(data.type === "LIMIT" && data.price == undefined){
        return false;
    }
    return true;
},{
    message: "Price is required for Limit Order",
    path:["price"]
});

