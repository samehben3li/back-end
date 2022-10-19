import { model, Schema } from 'mongoose';
import InputOption from './InputOption';

const pestTypeSchema = new Schema({
  ...InputOption.obj,
});

export default model('PestType', pestTypeSchema);
