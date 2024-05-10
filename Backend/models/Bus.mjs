import { Schema, model } from 'mongoose';
import BusType from './BusType.mjs'

const busSchema = new Schema({
  busnumber: { type: String, required: true },
  busType: { 
    type: Schema.Types.ObjectId,
    ref: 'BusType',
     required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  DepartureAt: { type: Date, required: true },
  ArrivalAt: { type: Date, required: true },
  Departuretime: { type: String, required: true }, // Store as string
  Arrivaltime: { type: String, required: true }, // Store as string
  fare: { type: Number, required: true },
  remaining:{ type: Number, required: true },
  Seatsavailable: { type: [Number], required: true },

  // Seatsavailable: { type:DataView, required: true }
});


export default model('Bus', busSchema);
