import { Action } from "redux"

import { Product } from "./Product"

type AddToCartPayload = Product
type RemoveFromCartPayload = number

export type CartAction = Action & {
  payload: AddToCartPayload | RemoveFromCartPayload
}
