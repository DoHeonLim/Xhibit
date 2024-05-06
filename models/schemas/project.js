/** @format */

const { Schema } = require("mongoose");

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    link: {
      type: String,
    },
    name: {
      type: String,
    },
    contentTitle: {
      type: String,
    },
    contentDetail: {
      type: [String],
    },
    techStack: {
      type: [String],
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

module.exports = ProjectSchema;
