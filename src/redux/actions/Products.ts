import { createRequestTypes, asyncAction } from "helpers/actionHelpers"
import axiosInstance from "redux/axiosInstance"
import { Product } from "types/Product"

export const GET_PRODUCTS = createRequestTypes("GET_PRODUCTS")

export const getProducts = () =>
  asyncAction<Product[]>(GET_PRODUCTS, axiosInstance.get(`/api/products/`))
