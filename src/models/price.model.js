const mongoose = require("mongoose");

const PriceSchema = mongoose.Schema(
  {
    value: Number,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Price", PriceSchema);
