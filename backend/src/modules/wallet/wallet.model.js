const walletSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
