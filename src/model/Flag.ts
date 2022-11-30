import { Schema, model } from 'mongoose';
import InputOption from './input-options/InputOption';

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

const flagSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    riskCategory: {
      type: InputOption,
      _id: false,
    },
    riskCategoryType: {
      type: InputOption,
      _id: false,
    },
    plantPart: {
      type: InputOption,
      _id: false,
    },
    location: {
      type: locationSchema,
      _id: false,
    },
  },
  { timestamps: true },
);

export default model('Flag', flagSchema);
