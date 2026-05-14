import { Router, Request, Response } from "express";
import { ORDERBOOK, BALANCES, ORDERS } from "../state";
import { Order } from "../types";
import { randomUUID } from "crypto";
import { orderSchema } from "../schemas/order";
const router = Router();

router.post("/order", async (req: Request, res: Response) => {
  try {
    const parsed = orderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues,
      });
    }
    const { userId, side, price, symbol, qty, type } = parsed.data;

    //USER EXIST?
    const userBalance = BALANCES[userId];

    if (!userBalance) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const book = ORDERBOOK[symbol];

    if (!book) {
      return res.status(404).json({
        error: "Symbol not found",
      });
    }

    //PLACING A LIMIT BUY ORDER

    if (type == "LIMIT" && side == "BUY") {
      const cost = price * qty!;

      if (!userBalance.INR || userBalance.INR.available < cost) {
        return res.status(400).json({
          error: "Insufficient INR",
        });
      }

      userBalance.INR.available -= cost;
      userBalance.INR.locked += cost;

      let remainingQuantity = qty!;

      const askPrices = Object.keys(book.asks)
        .map(Number)
        .sort((a, b) => a - b);
      for (let p of askPrices) {
        if (p > (price as number)) break;

        const ordersAtPrice = book.asks[p];
        while (ordersAtPrice.length > 0 && remainingQuantity > 0) {
          const sellOrder = ordersAtPrice[0];
          const availableQty = sellOrder.qty - sellOrder.filledQty;

          const matchedQty = Math.min(remainingQuantity, availableQty);

          // update quantities
          sellOrder.filledQty += matchedQty;

          remainingQuantity -= matchedQty;
 
            userBalance.INR.locked -= p * matchedQty ;
            
            if(!userBalance[symbol]){
                userBalance[symbol] = {
                    available: 0,
                    locked: 0
                };
            }
             userBalance[symbol].available += matchedQty;
          // mark sell order filled if done
          if (sellOrder.filledQty === sellOrder.qty) {
            sellOrder.status = "FILLED";

            ordersAtPrice.shift();
           

          }
        }
    }
        if(remainingQuantity > 0){
            const newOrder: Order = {
                id: randomUUID(),
                userId,
                symbol,
                qty:remainingQuantity,
                price,
                side,
                filledQty:0 ,
                status: "OPEN",
                createdAt: Date.now()
            };

            if(!book.bids[price]){
                book.bids[price] = [];
            }

            book.bids[price].push(newOrder);
        }
      
   
     return res.status(200).json({
        message: "Successful"
      })
    }

    //userId validation
  } catch (error) {
    return res.status(500).json({
        err: "error"
    })
  }
});
