import { Schema, model } from 'mongoose';

const riskCategorySchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  // link of image
  imgUrl: {
    type: String,
  },
});

export default model('RiskCategory', riskCategorySchema);
