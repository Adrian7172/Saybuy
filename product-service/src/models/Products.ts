import mongoose from "mongoose";

type ProductModel = {
  name: string;
  description: string;
  price: number;
  availability: boolean;
};

export type ProductDoc = mongoose.Document & ProductModel;

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    availability: Boolean,
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const products = mongoose.model<ProductDoc>("products", ProductSchema);

export { products };
