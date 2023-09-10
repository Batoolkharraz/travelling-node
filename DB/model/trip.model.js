
import mongoose, {Schema,model,Types} from 'mongoose';
const tripSchema = new Schema ({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    date:{type:Date,required:true},
    capcity:{type:Number,default:0,required:true},
    maxCapcity:{type:Number,default:0,required:true},
    rate:{type:Number},
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


