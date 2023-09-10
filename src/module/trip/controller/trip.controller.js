import tripModel from "../../../../DB/model/trip.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createTrip=asyncHandler(async (req,res,next)=>{
 
    const {name}=req.body;
    let date=new Date(req.body.date);
    let now = new Date();
    if(now.getTime()>=date.getTime()){
        return next (new Error('invalid date',{cause:400}));
    }
    date=date.toLocaleDateString();
    req.body.expireDate=date;
    if(await couponModel.findOne({name})){
        return next(new Error(`duplicateed coupon name ${name}`,{cause:409}));
    }
    const coupon=await couponModel.create(req.body);
    return res.status(201).json({message:"success",coupon});

})

export const updateCoupon=asyncHandler(async (req,res,next)=>{
    const coupon= await couponModel.findById(req.params.couponId);
    if(!coupon){
        return next (new Error ("invalid coupon Id"));
    }

    if(req.body.name){
        if(await couponModel.findOne({name:req.body.name})){
            return next(new Error(`duplicateed coupon name `,{cause:409}));
        }
        if(coupon.name==req.body.name){
            return next(new Error(`old name match the new name `,{cause:400}));
        }
        coupon.name=req.body.name;
    }

    if(req.body.amount){
        coupon.amount=req.body.amount;
    }

    await coupon.save();
    return res.json({message:"success",coupon})
})

export const getCoupon=asyncHandler(async (req,res,next)=>{
    const coupon= await couponModel.findById(req.params.couponId);
    return res.status(200).json({message:"success",coupon})
})

export const getAllCoupon=asyncHandler(async (req,res,next)=>{
    const coupons= await couponModel.find();
    return res.status(200).json({message:"success",coupons})
})
