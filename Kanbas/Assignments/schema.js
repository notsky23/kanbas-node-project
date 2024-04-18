import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
//   _id: { type: String},
  title: String,
  course: String,
  description: String,
  points: Number,
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date
},
  {collection: "assignments"}
);

export default assignmentSchema;