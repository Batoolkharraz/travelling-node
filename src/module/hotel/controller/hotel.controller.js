import hotelModel from "../../../../DB/model/hotel.model.js";
import countryModel from "../../../../DB/model/country.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createHotel=asyncHandler(async (req,res,next)=>{
 
    const {name,description,rate,country}=req.body;

    const Country = await countryModel.findOne({name:country});
    if(!Country){
        return next(new Error(`Please check the name of the country`,{cause:409}));
    }

    if(await hotelModel.findOne({name,countryId:Country._id})){
        return next(new Error(`duplicateed hotel name ${name}`,{cause:409}));
    }
    req.body.createdBy=req.user._id; 
    req.body.countryId=Country._id;
    const hotel=await hotelModel.create(req.body);
    return res.status(201).json({message:"success",hotel});

})

export const updateHotel=asyncHandler(async (req,res,next)=>{
    const hotel= await hotelModel.findById(req.params.hotelId);
    if(!hotel){
        return next (new Error ("invalid hotel Id"));
    }

    if(req.body.name){
        if(await hotelModel.findOne({name:req.body.name})){
            return next(new Error(`duplicateed hotel name `,{cause:409}));
        }
        if(hotel.name==req.body.name){
            return next(new Error(`old name match the new name `,{cause:400}));
        }
        hotel.name=req.body.name;
    }

    if(req.body.description){
        hotel.description=req.body.description;
    }

    if(req.body.rate){
        hotel.rate=req.body.rate;
    }

    if(req.body.country){
        const Country = await countryModel.findOne({name:req.body.country});
        if(!Country){
            return next(new Error(`Please check the name of the country`,{cause:409}));
        }
        hotel.countryId=Country._id;
    }

    hotel.updatedBy=req.user._id;
    await hotel.save();
    return res.json({message:"success",hotel})
})

export const getHotel=asyncHandler(async (req,res,next)=>{
    const hotel= await hotelModel.findById(req.params.hotelId);
    
    if(!hotel||hotel.isDeleted=='true'){
        return next(new Error("hotel not found"));
    }
    return res.status(200).json({message:"success",hotel})
})

export const getAllHotels=asyncHandler(async (req,res,next)=>{
    const hotels= await hotelModel.find({isDeleted:false});

    if(!hotels){
        return next(new Error("no hotel have been added yet"));
    }

    return res.status(200).json({message:"success",hotels})
})

export const deleteHotel=asyncHandler(async (req,res,next)=>{
    const hotel= await hotelModel.findById(req.params.hotelId);

    if(!hotel){
        return next(new Error("hotel not found"));
    }

    await hotelModel.findByIdAndDelete(req.params.hotelId)
    return res.status(200).json({message:"success"})
})

export const softDeleteHotel=asyncHandler(async (req,res,next)=>{
    const hotel= await hotelModel.findById(req.params.hotelId);

    if(!hotel){
        return next(new Error("hotel not found"));
    }

    await hotelModel.findByIdAndUpdate(req.params.hotelId,{isDeleted:true,deletedBy:req.user._id});
    return res.status(200).json({message:"success"})
})

export const reStoreHotel=asyncHandler(async (req,res,next)=>{
    const hotel= await hotelModel.findById(req.params.hotelId);

    if(!hotel){
        return next(new Error("hotel not found"));
    }

    await hotelModel.findByIdAndUpdate(req.params.hotelId,{isDeleted:false});
    return res.status(200).json({message:"success"})
})