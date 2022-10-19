import { Schema } from 'mongoose';

export default new Schema({
  name: {
    type: String,
    unique: true,
  },
  imgUrl: {
    type: String,
  },
});
