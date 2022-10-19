import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const plantPartSchema = new Schema({
  ...InputOption.obj,
});

export default model('PlantPart', plantPartSchema);
