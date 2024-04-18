import mongoose from "mongoose";

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  module: String  // Reference to the module ID, helpful for back-referencing if needed
});

// Module Schema
const moduleSchema = new mongoose.Schema({
  // _id: { type: String, required: false},
  name: String,
  description: String,
  course: { type: String, ref: 'Course' }, // Reference to the course ID, helpful for back-referencing if needed
  lessons: [lessonSchema],
},
  {collection: "modules"}
);

export default moduleSchema;