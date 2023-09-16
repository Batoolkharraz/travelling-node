
import mongoose, {Schema,model,Types} from 'mongoose';
const reviewSchema = new Schema ({
   comment:{type:String,requires:true},
    tripId:{type:Types.ObjectId,ref:'Trip',required:true},
    rating:{type:Number,required:true,min:0,max:5},
    createdBy:{type:Types.ObjectId,ref:'User',required:true},
},
{
    timestamps:true
})
const reviewModel = mongoose.models.Review ||  model('Review', reviewSchema);
export default reviewModel;