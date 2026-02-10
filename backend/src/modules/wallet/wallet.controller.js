import mongoose from "mongoose";
import * as WalletService from "./wallet.service.js";
import Wallet from "./wallet.model.js";

// export const creditWallet = async (req, res, next) => {
//   const { client_id, amount } = req.body;
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const wallet = await WalletService.credit(client_id, amount, session);
//     await session.commitTransaction();
//     res.json(wallet);
//   } catch (err) {
//     await session.abortTransaction();
//     next(err);
//   } finally {
//     session.endSession();
//   }
// };

export const creditWallet = async (req, res, next) => {
  const { client_id, amount } = req.body;

  if (!client_id || !amount) {
    return res.status(400).json({
      message: "client_id and amount are required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "amount must be greater than 0",
    });
  }

  // rest of logic unchanged
};

export const debitWallet = async (req, res, next) => {
  const { client_id, amount } = req.body;

  // 🔒 Input validation
  if (!client_id || amount == null) {
    return res.status(400).json({
      message: "client_id and amount are required",
    });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      message: "amount must be a positive number",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await WalletService.debit(client_id, amount, session);
    await session.commitTransaction();
    res.json(wallet);
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export const getBalance = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ clientId: req.clientId });
    res.json({ balance: wallet?.balance || 0 });
  } catch (err) {
    next(err);
  }
};
