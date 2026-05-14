export type Side = "BUY" | "SELL";

export interface User {
    id: string,
    username: string,
    password: string
}

export interface Order{
    id: string,
    userId: string,
    symbol: string,
    side: Side,
    price: number,
    qty: number,
    filledQty: number,
    status: "OPEN"| "FILLED" |"CANCELLED"
    createdAt: number;

}

export interface Stock {
    id: number,
    title: string,
    symbol: string
}

export interface Fill {
    id: string,
    stockId: number,
    price: number,
    qty: number,
    buyOrderId: string,
    sellOrderId: string,
    timestamp: number
}

export interface BalanceEntry{
    available: number,
    locked: number;
}
export interface UserBalance {
    [asset: string]: BalanceEntry;
}