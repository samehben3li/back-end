import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const riskCategorySchema = new Schema({
  ...InputOption,
  riskCategoryTypes: {
    type: Array,
    of: InputOption,
  },
});

export default model('RiskCategory', riskCategorySchema);
