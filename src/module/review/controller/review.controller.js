import tripModel from "../../../../DB/model/trip.model.js";
import bookingModel from "../../../../DB/model/booking.model.js";
import reviewModel from "../../../../DB/model/review.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import moment from 'moment';

export const createReview=asyncHandler(async (req,res,next)=>{
    const {rating,comment}=req.body;
    const booking=await bookingModel.findOne({
        tripId:req.params.tripId
    });
    if(!booking){
        return next(new Error(`can not review trip u did not booked `,{cause:400}));
    }
    if(booking){
        if(!booking.bookedBy.includes(req.user._id)){
            return next(new Error(`u did not booked this trip please check again ${req.user.userName}`));
        }
    }
    const checkReview=await reviewModel.findOne({createdBy:req.user._id,tripId:req.params.tripId});
    if(checkReview){
        return next(new Error(`already review by u `,{cause:400}));
    }
    const review = await reviewModel.create({
        createdBy:req.user._id,
        tripId:req.params.tripId,
        comment,
        rating
    })
    return res.status(201).json({message:"success",review});
}) 

export const updateReview=asyncHandler(async (req,res,next)=>{
    const {tripId,reviewId}=req.params;
    const review=await reviewModel.findByIdAndUpdate({
        _id:reviewId,
        createdBy:req.user._id,
        tripId},req.body
        ,{new:true});
    return res.status(201).json({message:"success",review});
}) 

export const getReview=asyncHandler(async (req,res,next)=>{
    const review= await reviewModel.findById(req.params.reviewId);
    
    if(!review){
        return next(new Error("review not found"));
    }
    return res.status(200).json({message:"success",review})
})

export const getAllReviews=asyncHandler(async (req,res,next)=>{
    const reviews= await reviewModel.find();

    if(!reviews){
        return next(new Error("no review have been added yet"));
    }

    return res.status(200).json({message:"success",reviews})
})

export const deleteReview=asyncHandler(async (req,res,next)=>{
    const review= await reviewModel.findById(req.params.reviewId);

    if(!review){
        return next(new Error("review not found"));
    }

    await reviewModel.findByIdAndDelete(req.params.reviewId)
    return res.status(200).json({message:"success"})
})
