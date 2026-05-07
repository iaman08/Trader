import { Router , Request, Response } from "express";
import { BALANCES } from "../state";

const router = Router();

router.get("/balance/:userId", (req: Request, res: Response) => {
    const { userId } = req.params.userId as any;

    const userBalance = BALANCES[userId];

    if(!userBalance){
        return res.status(404).json({
            error: "User not found"
        })
    }

    return res.status(200).json(userBalance);
});

export default router;