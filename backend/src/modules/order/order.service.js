import mongoose from "mongoose";
import axios from "axios";
import Order from "./order.model.js";
import { debit } from "../wallet/wallet.service.js";

export const createOrder = async (clientId, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Debit wallet atomically
    await debit(clientId, amount, session);

    // 2. Create order
    const [order] = await Order.create([{ clientId, amount }], { session });

    // 3. Call fulfillment API
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: clientId,
        title: order._id.toString(),
      },
    );

    // 4. Update order with fulfillmentId
    order.fulfillmentId = response.data.id;
    order.status = "FULFILLED";
    await order.save({ session });

    // 5. Commit transaction
    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
