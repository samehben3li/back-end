import { model, Schema } from 'mongoose';
import { IRiskCategory } from '../../interfaces';
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

const riskCategoryModel = model<IRiskCategory>(
  'RiskCategory',
  riskCategorySchema,
);

export default riskCategoryModel;
