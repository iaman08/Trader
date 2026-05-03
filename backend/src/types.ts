export type Side = "BUY" || "SELL";

export interface User {
    id: String,
    username: String,
    password: String
}

export interface Order{
    id: String,
    userId: String,
    symbol: String,
    side: Side,
    price: Number,
    qty: Number,
    filledQty: Number,
    status: "OPEN"| "FILLED" |"CANCELLED"
    createdAt: number;

}

export interface Stock {
    id: Number,
    title: String,
    symbol: String
}

export interface Fill {
    id: String,
    stockId: Number,
    price: Number,
    qty: Number,
    buyOrderId: String,
    sellOrderId: String,
    timestamp: Number
}

export interface BalanceEntry{
    available: number,
    locked: number;
}
export interface UserBalance {
    [asset: string]: BalanceEntry;
}