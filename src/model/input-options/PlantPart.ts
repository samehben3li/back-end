import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const plantPartSchema = new Schema(
  {
    ...InputOption,
  },
  { timestamps: true },
);

export default model('PlantPart', plantPartSchema);
