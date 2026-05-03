import {User, Stock, Order, Fill, UserBalance } from "./types";

export const USERS : User[] = [];

export const STOCKS: Stock[] = [
    {id: 1, title: "ETHERUM", symbol:"ETH"},
    {id: 2, title: "BITCOIN", symbol:"BTC"},
    {id: 3, title: "AXIS BANK",symbol:"AXB"}
]

export const ORDERS: Order[] = [];
export const FILLS: Fill[] = [];

export const BALANCES: Record<string,UserBalance> = {};

export const ORDERBOOK: Record<string,{
    bids: Record<number, Order[]>;
    asks: Record<number, Order[]>;
}> = {
    AXIS: { bids: {}, asks:{}},
    HDFC: { bids: {}, asks:{}},
    TATA: { bids: {}, asks:{}},
};
