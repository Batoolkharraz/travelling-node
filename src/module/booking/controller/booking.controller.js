import bookingModel from "../../../../DB/model/booking.model.js";
import countryModel from "../../../../DB/model/country.model.js";
import hotelModel from "../../../../DB/model/hotel.model.js";
import tripModel from "../../../../DB/model/trip.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const makeBooking=asyncHandler(async (req,res,next)=>{
 
    const trip=await tripModel.findById(req.params.tripId);
    if(!trip){
        return next(new Error(`There is no trip with this ID`,{cause:409}));
    }
    let booking=await bookingModel.findOne(req.params.tripId);
    if(booking){
        await bookingModel.updateOne({_id:booking.tripId},{
            $pull:{bookedBy:req.user._id}
        })
    }
    else{
        booking=await bookingModel.create({tripId:req.params.tripId},{$pull:{bookedBy:req.user._id}});
    }
    return res.status(201).json({message:"success",booking});

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
        trip.maxCapacity=req.body.maxCapacity;
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
            return next(new Error(`Please check the name of the country`,{cause:409}));
        }
        trip.hotelId=Hotel._id;
    }
    await trip.save();
    return res.json({message:"success",trip})
})

export const getTrip=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);
    return res.status(200).json({message:"success",trip})
})

export const getAllTrip=asyncHandler(async (req,res,next)=>{
    const trips= await tripModel.find();
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

export const updateOrderStatusFromAdmin=asyncHandler(async (req,res,next)=>{
    const {orderId}=req.params;
    const {status}=req.body;
    const order =await orderModel.findOne({_id:orderId});
    if(!order|| order.status=='delevered'){
        return next(new Error(`this order not found or this order status is : ${order.status}`));
    }
    const changeOrderStatus=await orderModel.updateOne({_id:orderId},{status,updatedBy:req.user._id});
    
    if(!changeOrderStatus.matchedCount){
        return next(new Error(`fail to change status this order`,{cause:400}));
    }
    return res.status(201).json({message:"success"});
}) 