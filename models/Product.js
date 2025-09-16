// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    category: { type: String },
    subcategory: { type: String },
    inStock: { type: Boolean, default: true },
    stock: { type: Number, default: 0 },
    releaseYear: { type: Number },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
