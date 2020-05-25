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

mongoose.model("Price", PriceSchema);

const HomeSchema = mongoose.Schema(
  {
    url: String,
    description: String,
    location: String,
    area: String,
    year: Number,
    price: [PriceSchema],
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", HomeSchema);
