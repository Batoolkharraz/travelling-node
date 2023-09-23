import countryModel from "../../../../DB/model/country.model.js";
import hotelModel from "../../../../DB/model/hotel.model.js";
import tripModel from "../../../../DB/model/trip.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createTrip=asyncHandler(async (req,res,next)=>{
 
    const {name,description,capacity,maxCapacity,rate,country,hotel}=req.body;
    let date=new Date(req.body.date);
    let now = new Date();
    if(now.getTime()>=date.getTime()){
        return next (new Error('invalid date',{cause:400}));
    }
    req.body.date=date;

    if(await tripModel.findOne({name})){
        return next(new Error(`duplicateed Trip ${name}`,{cause:409}));
    }

    const Country = await countryModel.findOne({name:country});
    if(!Country){
        return next(new Error(`Please check the name of the country`,{cause:409}));
    }
    req.body.countryId=Country._id;

    const Hotel = await hotelModel.findOne({name:hotel});
    if(!Hotel){
        return next(new Error(`Please check the name of the country`,{cause:409}));
    }

    /*if(Hotel.countryId!=Country._id){
        return next(new Error(`This hotel is not in this country`,{cause:409}));
    }*/
    req.body.hotelId=Hotel._id;

    if(capacity>maxCapacity){
        return next(new Error(`Please check the Capacity again`,{cause:400}));
    }

    const trip=await tripModel.create(req.body);
    return res.status(201).json({message:"success",trip});

})

export const updateTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);
    if(!trip){
        return next (new Error ("invalid trip Id"));
    }

    if(req.body.name){
        if(await tripModel.findOne({name:req.body.name})){
            return next(new Error(`duplicateed trip name `,{cause:409}));
        }
        if(trip.name==req.body.name){
            return next(new Error(`old name match the new name `,{cause:400}));
        }
        trip.name=req.body.name;
    }
    if(req.body.description){
        trip.description=req.body.description;
    }
    if(req.body.maxCapacity){
        trip.maxCapacity=req.body.maxCapacity;
    }
    if(req.body.capacity){
        if(req.body.capacity>trip.maxCapacity){
            return next (new Error ("invalid new capacity is larger than maximam capacity"));
        }
        trip.capacity=req.body.capacity;
    }
    if(req.body.rate){
        trip.rate=req.body.rate;
    }
    if(req.body.date){
        let date=new Date(req.body.date);
        let now = new Date();
        if(now.getTime()>=date.getTime()){
            return next (new Error('invalid date',{cause:400}));
        }
        trip.date=date;
    }
    if(req.body.country){
        const Country = await countryModel.findOne({name:req.body.country});
        if(!Country){
            return next(new Error(`Please check the name of the country`,{cause:409}));
        }
        trip.countryId=Country._id;
    }
    if(req.body.hotel){
        const Hotel = await hotelModel.findOne({name:req.body.hotel});
        if(!Hotel){
            return next(new Error(`Please check the name of the hotel`,{cause:409}));
        }
        trip.hotelId=Hotel._id;
    }
    await trip.save();
    return res.json({message:"success",trip})
})

export const getTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);
    
    if(!trip||trip.isDeleted=='true'){
        return next(new Error("trip not found"));
    }
    return res.status(200).json({message:"success",trip})
})

export const getAllTrip=asyncHandler(async (req,res,next)=>{
    const trips= await tripModel.find({isDeleted:false});

    if(!trips){
        return next(new Error("no trip have been added yet"));
    }

    return res.status(200).json({message:"success",trips})

})

export const deleteTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);

    if(!trip){
        return next(new Error("trip not found"));
    }

    await tripModel.findByIdAndDelete(req.params.tripId)
    return res.status(200).json({message:"success"})
})

export const softDeleteTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);

    if(!trip){
        return next(new Error("trip not found"));
    }

    await tripModel.findByIdAndUpdate(req.params.tripId,{isDeleted:true,deletedBy:req.user._id});
    return res.status(200).json({message:"success"})
})

export const reStoreTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);

    if(!trip){
        return next(new Error("trip not found"));
    }

    await tripModel.findByIdAndUpdate(req.params.tripId,{isDeleted:false});
    return res.status(200).json({message:"success"})
})


export const searchTripByCountry=asyncHandler(async (req,res,next)=>{
    /* const trips= await tripModel.find({isDeleted:false});
 
     if(!trips){
         return next(new Error("no trip have been added yet"));
     }
 
     return res.status(200).json({message:"success",trips})*/
     const Country = await countryModel.findOne({name:req.body.country});
     if(!Country){
         return next(new Error(`Please check the name of the country`,{cause:409}));
     }
     const trips= await tripModel.find({countryId:Country._id,isDeleted:false});
 
     if(!trips){
         return next(new Error("no trip found"));
     }
 
     return res.status(200).json({message:"success",trips})
 
 })

export const searchTripByPrice=asyncHandler(async (req,res,next)=>{

    const trips= await tripModel.find({price:{$lte:req.body.price},isDeleted:false});

    if(!trips){
        return next(new Error("no trip found"));
    }

    return res.status(200).json({message:"success",trips})

})

export const searchTripByDate=asyncHandler(async (req,res,next)=>{ 
    let date=new Date(req.body.date);
    let now = new Date();
    if(now.getTime()>=date.getTime()){
        return next (new Error('invalid date',{cause:400}));
    }
    const trips= await tripModel.find({date:{$lte:date},isDeleted:false});

    if(!trips){
        return next(new Error("no trip found"));
    }

    return res.status(200).json({message:"success",trips})

})