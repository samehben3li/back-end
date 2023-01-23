import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const plantPartSchema = new Schema(
  {
    ...InputOption,
  },
  { timestamps: true },
);

const plantPartModel = model('PlantPart', plantPartSchema);

export default plantPartModel;
