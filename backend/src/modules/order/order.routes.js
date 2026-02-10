import { Router } from "express";
import {
  createOrderController,
  getOrderController,
} from "./order.controller.js";
import clientMiddleware from "../../middlewares/client.middleware.js";

const router = Router();

router.use(clientMiddleware);

router.post("/", createOrderController);
router.get("/:id", getOrderController);

export default router;
