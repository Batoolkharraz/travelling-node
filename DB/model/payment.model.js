
import mongoose, {Schema,model,Types} from 'mongoose';
const paymentSchema = new Schema ({
    paiedBy:{type:Types.ObjectId,ref:'User',required:true,},
    address:{type:String,required:true},
    phoneNumber:[{type:String,required:true}],
    tripId:{type:Types.ObjectId,ref:'Trip',required:true},
    couponId:{type:Types.ObjectId,ref:'Coupon'},
    finalPrice:{type:Number,required:true},
    paymentMethod:{type:String,default:'cash',enum:['cash','card']},
    updatedBy:{type:Types.ObjectId,ref:'User'},
},
{
    timestamps:true
})
const paymentModel = mongoose.models.Payment ||  model('Payment', paymentSchema);
export default paymentModel;