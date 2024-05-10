import { Schema, model } from 'mongoose';

const BusType = new Schema({
  type: { type: String, required: true ,unique:true},
  capacity: { type: Number, required: true },
});

export default model('BusType', BusType);