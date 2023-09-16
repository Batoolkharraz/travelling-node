
import mongoose, {Schema,model,Types} from 'mongoose';
const tripSchema = new Schema ({
    name:{type:String,required:true,},
    description:{type:String,required:true},
    date:{type:Date,required:true},
    capacity:{type:Number,default:0,required:true},
    maxCapacity:{type:Number,default:0,required:true},
    rate:{type:Number},
    price:{type:Number,required:true},
    countryId:{type:Types.ObjectId,ref:'Country',required:true},
    hotelId:{type:Types.ObjectId,ref:'Hotel',required:true},
    createdBy:{type:Types.ObjectId,ref:'User'},
    deletedBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    isDeleted:{type:Boolean,default:false},
},
{
    timestamps:true
}) 

const tripModel = mongoose.models.Trip ||  model('Trip', tripSchema);
export default tripModel;


