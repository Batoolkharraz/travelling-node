
import mongoose, {Schema,model,Types} from 'mongoose';
const bookingSchema = new Schema ({
    tripId:{type:Types.ObjectId,ref:'Trip'},
    description:{
        type:String,
    },
    bookedBy:[{type:Types.ObjectId,ref:'User'}],
    deletedBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    isDeleted:{type:Boolean,default:false},
},
{
    timestamps:true
}) 

const bookingModel = mongoose.models.Booking ||  model('Booking', bookingSchema);
export default bookingModel;


