export type Side = "BUY" || "SELL";

export interface User {
    id: String,
    username: String,
    password: String
}

export interface Order{
    id: String,
    userId: String,
    side: String,
    type: String,
    stockId: String,
    price: Number,
    qty: Number,
    filledQty: Number,
    status: String
}

export interface Stock {
    id: String,
    title: String,
    symbol: String
}

export interface Order {
    id: String,
    
}