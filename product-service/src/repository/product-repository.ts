import mongoose from "mongoose";
import { products } from "../models/Products";
import { ProductInput } from "../models/dto/ProductInput";

export class ProductRepository {
  constructor() {}

  async CreateProduct({ name, description, price }: ProductInput) {
    return products.create({
      name,
      description,
      price,
      availability: true,
    });
  }

  async GetAllProducts() {
    return { message: "response from create Product" };
  }
}
