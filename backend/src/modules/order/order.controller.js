import Order from "./order.model.js";
import { createOrder } from "./order.service.js";

export const createOrderController = async (req, res, next) => {
  try {
    const order = await createOrder(req.clientId, req.body.amount);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrderController = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      clientId: req.clientId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};
