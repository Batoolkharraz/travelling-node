
import mongoose, {Schema,model,Types} from 'mongoose';
const hotelSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    rate:{
        type:Number
    },
    countryId:{type:Types.ObjectId,ref:'Country'},
    createdBy:{type:Types.ObjectId,ref:'User'},
    deletedBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    isDeleted:{type:Boolean,default:false},
},
{
    timestamps:true
}) 

const hotelModel = mongoose.models.Hotel ||  model('Hotel', hotelSchema);
export default hotelModel;


