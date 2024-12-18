import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
 title: String,
 company: String,
 location: String,
  link: {type: String, unique: true},
  description: String,
  isApplied: { type: Boolean, default: false },
});

const Job = mongoose.model('Job', jobSchema);


export default Job;