import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const riskCategorySchema = new Schema({
  ...InputOption.obj,
});

export default model('RiskCategory', riskCategorySchema);
