import tripModel from "../../../../DB/model/trip.model.js";
import bookingModel from "../../../../DB/model/booking.model.js";
import paymentModel from "../../../../DB/model/payment.model.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import moment from 'moment';

export const createPayment=asyncHandler(async (req,res,next)=>{
    const {address,phoneNumber,couponName,paymentMethod}=req.body;
    
    const trip = await tripModel.findById(req.params.tripId);
    if(!trip){
        return next(new Error(`invalid trip Id`,{cause:400}));
    }

    let finalPrice=trip.price;

    const booking=await bookingModel.findOne({
        tripId:req.params.tripId
    });
    if(!booking){
        return next(new Error(`can not pay for a trip u did not booked `,{cause:400}));
    }
    if(booking){
        if(!booking.bookedBy.includes(req.user._id)){
            return next(new Error(`${req.user.userName} u did not booked this trip please check again`));
        }
    }

    if(couponName){
        const coupon = await couponModel.findOne({name:couponName})
        
        if(!coupon){
        return next(new Error(`invalid coupon ${couponName}`,{cause:400}));
        }
        let now = moment();
        let parsed=moment(coupon.expireDate,'DD/MM/YYYY');
        let diff=now.diff(parsed,'days');
        if(diff>=0){
            return next(new Error('coupon is expired',{cause:400}));
        }
        if(coupon.usedBy.includes(req.user._id)){
            return next(new Error(`coupon already used by ${req.user.userName}`));
        }
        req.body.coupon=coupon;
        finalPrice=trip.price-((coupon.amount/100)*trip.price);
    }


    const payment=await paymentModel.create({
        paiedBy:req.user._id,
        address,
        couponId:req.body.coupon?._id,
        paymentMethod,
        finalPrice,
        tripId:trip._id,
        phoneNumber
    })

    if(req.body.coupon){
        await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
    }
    return res.status(201).json({message:"success",payment});
}) 

export const updatePayment=asyncHandler(async (req,res,next)=>{ 
    const payment= await paymentModel.findById(req.params.paymentId);

    if(!payment){
        return next (new Error ("invalid payment Id"));
    }

    if(req.body.address){
        payment.address=req.body.address;
    }

    if(req.body.phoneNumber){
        payment.phoneNumber=req.body.phoneNumber;
    }

    payment.updatedBy=req.user._id;
    await payment.save();
    return res.json({message:"success",payment})
}) 

export const getPayment=asyncHandler(async (req,res,next)=>{
    const payment= await paymentModel.findById(req.params.paymentId);
    
    if(!payment){
        return next(new Error("payment not found"));
    }
    return res.status(200).json({message:"success",payment})
})

export const getAllPayments=asyncHandler(async (req,res,next)=>{
    const payments= await paymentModel.find();

    if(!payments){
        return next(new Error("no payment have been done yet"));
    }

    return res.status(200).json({message:"success",payments})
})
