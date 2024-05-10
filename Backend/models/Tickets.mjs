import { Schema,model } from "mongoose";

const Ticket = new Schema({
    bus:{type: Schema.Types.ObjectId,
        ref: 'Bus',
        required: true },
    UserInfo :{type: Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    number :{type:Number,required:true},
    Passengers : [
        {
            name:{type:String,required:true},
            age:{type:Number,required:true},
            gender:{type:String,required:true},
            seatNumber :{type:Number,required:true}
        }
    ],
    status : {type:String ,
        enum: ['PENDING', 'COMPLETED', 'FAILED','REFUNDED','REVERSED','CANCELED_REVERSAL',"PROCESSED","VOIDED"],
        default: 'PENDING',
        required:true},
    amount:{type:Number , required:true},
    journeyDate:{type:Date,required:true},
    Departuretime: { type: String, required: true },
    transactionId:{type:String,required:true},
    transactionDate:{type:Date,required:true},
    paymentSource:{type:String}
    
}, { timestamps: true })

export default model('Ticket',Ticket)