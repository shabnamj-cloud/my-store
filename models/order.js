import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  shippingInfo: {
    fullName: String,
    address: String,
    phone: String,
  },
  paymentMethod: String,
  totalAmount: Number,
  paymentStatus: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
