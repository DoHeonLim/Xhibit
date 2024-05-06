/** @format */

const { Schema, Types } = require("mongoose");

const EducationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
    },
    periodStart: {
      type: Date,
      required: true,
    },
    periodEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = EducationSchema;
