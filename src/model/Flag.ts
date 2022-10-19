import { Schema, model } from 'mongoose';

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
  // riskCategory: {
  //   type: RiskCategory,
  // },
  // pestType: {
  //   type: PestType,
  // },
  // plantPart: {
  //   type: PlantPart,
  // },
  location: {
    type: locationSchema,
  },
});

export default model('Flag', flagSchema);
