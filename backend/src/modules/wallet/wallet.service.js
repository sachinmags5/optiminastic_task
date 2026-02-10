import Wallet from "./wallet.model.js";
import Ledger from "../ledger/ledger.model.js";

export const credit = async (clientId, amount, session) => {
  if (!clientId) {
    throw new Error("clientId is required");
  }

  return Wallet.findOneAndUpdate(
    { clientId },
    { $inc: { balance: amount } },
    { upsert: true, new: true, session },
  );
};

export const debit = async (clientId, amount, session) => {
  if (!clientId) {
    throw new Error("clientId is required");
  }

  if (amount <= 0) {
    throw new Error("amount must be greater than zero");
  }

  const wallet = await Wallet.findOne({ clientId }).session(session);

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  if (wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  wallet.balance -= amount;
  await wallet.save({ session });

  await Ledger.create([{ clientId, type: "DEBIT", amount }], { session });

  return wallet;
};
