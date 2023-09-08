import hotelModel from "../../../../DB/model/hotel.model.js";
import countryModel from "../../../../DB/model/country.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createHotel=asyncHandler(async (req,res,next)=>{
 
    const {name,description,rate,country}=req.body;
    return res.status(201).json(country._id);

    if(await hotelModel.findOne({name})){
        return next(new Error(`duplicateed hotel name ${name}`,{cause:409}));
    }
    req.body.createdBy=req.user._id; 
    const hotel=await countryModel.create(req.body);
    return res.status(201).json({message:"success",hotel});

})

export const updateCountry=asyncHandler(async (req,res,next)=>{
    const country= await countryModel.findById(req.params.countryId);
    if(!country){
        return next (new Error ("invalid country Id"));
    }

    if(req.body.name){
        if(await countryModel.findOne({name:req.body.name})){
            return next(new Error(`duplicateed country name `,{cause:409}));
        }
        if(country.name==req.body.name){
            return next(new Error(`old name match the new name `,{cause:400}));
        }
        country.name=req.body.name;
    }

    if(req.body.description){
        country.description=req.body.description;
    }

    country.updatedBy=req.user._id;
    await country.save();
    return res.json({message:"success",country})
})

export const getCountry=asyncHandler(async (req,res,next)=>{
    const country= await countryModel.findById(req.params.countryId);
    
    if(!country||country.isDeleted=='true'){
        return next(new Error("country not found"));
    }
    return res.status(200).json({message:"success",country})
})

export const getAllCountry=asyncHandler(async (req,res,next)=>{
    const countries= await countryModel.find({isDeleted:false});

    if(!countries){
        return next(new Error("no country have been added yet"));
    }

    return res.status(200).json({message:"success",countries})
})

export const deleteCountry=asyncHandler(async (req,res,next)=>{
    const country= await countryModel.findById(req.params.countryId);

    if(!country){
        return next(new Error("country not found"));
    }

    await countryModel.findByIdAndDelete(req.params.countryId)
    return res.status(200).json({message:"success"})
})

export const softDeleteCountry=asyncHandler(async (req,res,next)=>{
    const country= await countryModel.findById(req.params.countryId);

    if(!country){
        return next(new Error("country not found"));
    }

    await countryModel.findByIdAndUpdate(req.params.countryId,{isDeleted:true,deletedBy:req.user._id});
    return res.status(200).json({message:"success"})
})

export const reStoreCountry=asyncHandler(async (req,res,next)=>{
    const country= await countryModel.findById(req.params.countryId);

    if(!country){
        return next(new Error("country not found"));
    }

    await countryModel.findByIdAndUpdate(req.params.countryId,{isDeleted:false});
    return res.status(200).json({message:"success"})
})