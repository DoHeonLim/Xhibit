/** @format */

const { Schema } = require("mongoose");

const AwardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    agency: {
      type: String,
    },
    periodStart: {
      type: Date,
    },
    periodEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AwardSchema;
