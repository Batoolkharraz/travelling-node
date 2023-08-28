
import mongoose, {Schema,model,Types} from 'mongoose';
const countrySchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    createdBy:{type:Types.ObjectId,ref:'User'},
    deletedBy:{type:Types.ObjectId,ref:'User'},
    updatedBy:{type:Types.ObjectId,ref:'User'},
    isDeleted:{type:Boolean,default:false},
},
{
    timestamps:true
}) 

const countryModel = mongoose.models.Country ||  model('Country', countrySchema);
export default countryModel;


