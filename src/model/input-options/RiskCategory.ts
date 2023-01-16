import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const riskCategorySchema = new Schema(
  {
    ...InputOption,
    riskCategoryTypes: {
      type: Array,
      of: InputOption,
    },
  },
  { timestamps: true },
);

const riskCategoryModel = model('RiskCategory', riskCategorySchema);

export default riskCategoryModel;
