import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  // _id: { type: String, required: false},
  name: String,
  number: String,
  section: String,
  startDate: Date,
  endDate: Date,
  semester: String,
  sem: String,
  image: String,
},
  {collection: "courses"}
);

export default courseSchema;