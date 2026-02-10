import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["CREATED", "FULFILLED"],
      default: "CREATED",
    },
    fulfillmentId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
