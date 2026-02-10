import { Router } from "express";
import * as controller from "./wallet.controller.js";
import clientMiddleware from "../../middlewares/client.middleware.js";

const router = Router();

router.get("/balance", clientMiddleware, controller.getBalance);
router.post("/credit", controller.creditWallet);
router.post("/debit", controller.debitWallet);

export default router;
