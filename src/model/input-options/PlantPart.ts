import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const plantPartSchema = new Schema({
  ...InputOption,
});

export default model('PlantPart', plantPartSchema);
