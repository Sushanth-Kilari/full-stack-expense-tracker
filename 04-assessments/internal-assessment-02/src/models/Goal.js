const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    target: { type: Number, required: true, min: [1, "Target must be at least 1"] },
    saved: { type: Number, default: 0, min: 0 },
    deadline: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// virtual field: percentage completed, never above 100
goalSchema.virtual("progress").get(function () {
  return Math.min(100, Math.round((this.saved / this.target) * 100));
});

module.exports = mongoose.model("Goal", goalSchema);
