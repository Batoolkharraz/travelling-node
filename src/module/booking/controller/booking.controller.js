import bookingModel from "../../../../DB/model/booking.model.js";
import countryModel from "../../../../DB/model/country.model.js";
import hotelModel from "../../../../DB/model/hotel.model.js";
import tripModel from "../../../../DB/model/trip.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import moment from 'moment';

export const makeBooking=asyncHandler(async (req,res,next)=>{
 
    const trip=await tripModel.findById(req.params.tripId);
    if(!trip){
        return next(new Error(`There is no trip with this ID`,{cause:409}));
    }

    let booking =await bookingModel.findOne({tripId:req.params.tripId});
    if(!booking){
        let newCap=trip.capacity+1;
        await tripModel.updateOne({_id:trip._id},{capacity:newCap});

        const newBook=await bookingModel.create({tripId:req.params.tripId,
            bookedBy:req.user._id
        });
        return res.status(201).json({message:"success",newBook});
    }
    else{
        if(booking.bookedBy.includes(req.user._id)){
            return next(new Error(`trip already booked by you ${req.user.userName}`));
        }
        if(trip.capacity==trip.maxCapacity){
            return next(new Error(`the trip capacity reach the maximam `));
        }
        let newCap=trip.capacity+1;
        await tripModel.updateOne({_id:trip._id},{capacity:newCap});

        await bookingModel.updateOne({tripId:req.params.tripId},{
            $addToSet:{bookedBy:req.user._id}
        });
        return res.status(201).json({message:"success",booking});

       }       

})

export const cancleBooking=asyncHandler(async (req,res,next)=>{
    const trip= await tripModel.findById(req.params.tripId);
    if(!trip){
        return next (new Error ("invalid trip Id"));
    }

    let booking=await bookingModel.findOne({tripId:req.params.tripId});
    if(!booking){
        return next (new Error ("invalid booking Id"));
    }
    if(!booking.bookedBy.includes(req.user._id)){
        return next (new Error ("you did not booking this trip"));
    }
    let now = moment();
    let parsed=moment(trip.date,'DD/MM/YYYY');
    let diff=now.diff(parsed,'days');
    if(diff<-7){
        return next (new Error ("you can not cancle your trip in this time (should cancel it before a week from the trip date)"));
    }
    
    let newCap=trip.capacity-1;
    await tripModel.updateOne({_id:trip._id},{capacity:newCap});

    await bookingModel.updateOne({tripId:booking.tripId},{
        $pull:{bookedBy:req.user._id}});
    
    return res.status(201).json({message:"success"});
})

export const getBooking=asyncHandler(async (req,res,next)=>{
    const booking= await bookingModel.findById(req.params.bookingId);
    return res.status(200).json({message:"success",booking})
})

export const getAllBooking=asyncHandler(async (req,res,next)=>{
    const bookings= await bookingModel.find();
    return res.status(200).json({message:"success",bookings})
})
