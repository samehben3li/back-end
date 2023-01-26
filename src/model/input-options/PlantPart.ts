import { model, Schema } from 'mongoose';
import { IInputOptions } from '../../interfaces';
import InputOption from './InputOption';

const plantPartSchema = new Schema<IInputOptions>(
  {
    ...InputOption,
  },
  { timestamps: true },
);

const plantPartModel = model<IInputOptions>('PlantPart', plantPartSchema);

export default plantPartModel;
