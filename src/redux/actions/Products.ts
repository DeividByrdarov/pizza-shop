import { createRequestTypes, asyncAction } from "helpers/actionHelpers"
import { Product } from "types/Product"

export const GET_PRODUCTS = createRequestTypes("GET_PRODUCTS")

export const getProducts = () =>
  asyncAction<Product[]>(GET_PRODUCTS, ["get", `/api/products/`])
