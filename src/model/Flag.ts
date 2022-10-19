import { Schema, model } from 'mongoose';
import RiskCategory from './RiskCategory';

const locationSchema = new Schema({
  left: {
    type: [],
  },
  right: {
    type: [],
  },
});

const flagSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  riskCategory: {
    type: RiskCategory,
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
