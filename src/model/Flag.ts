import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  // Array of String
  left: {
    type: Array,
    of: String,
  },
  // Array of String
  right: {
    type: Array,
    of: String,
  },
});

const flagSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  riskCategory: {
    type: String,
  },
  pestType: {
    type: String,
  },
  plantPart: {
    type: String,
  },
  location: {
    type: locationSchema,
  },
});

export default model('Flag', flagSchema);
