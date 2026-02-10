import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/error.middleware.js";
import walletRoutes from "./modules/wallet/wallet.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
const app = express();

// Allow requests from your frontend (http://localhost:5173) app.use(cors({ origin: "http://localhost:5173", // frontend URL methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/wallet", walletRoutes);
app.use("/orders", orderRoutes);

app.use(errorMiddleware);

export default app;
