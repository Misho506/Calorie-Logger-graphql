import mongoose from "mongoose";

const calories = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  burned: {
    type: Boolean,
    required: true,
  },
});

const CalorieModel = mongoose.model("Calories", calories);

export default CalorieModel;