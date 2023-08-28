import orderModel from "../../../../DB/model/order.model.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import reviewModel from "../../../../DB/model/review.model.js";
import cartModel from "../../../../DB/model/cart.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import productModel from "../../../../DB/model/product.model.js";
import moment from 'moment';

export const createReview=asyncHandler(async (req,res,next)=>{
    const {rating,comment}=req.body;
    const {productId}=req.params;
    const order=await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId
    });
    if(!order){
        return next(new Error(`can not review product befor receive it `,{cause:400}));
    }
    const checkReview=await reviewModel.findOne({createdBy:req.user._id,productId});
    if(checkReview){
        return next(new Error(`alresdy review by u `,{cause:400}));
    }
    const review = await reviewModel.create({
        createdBy:req.user._id,
        orderId:order._id,
        productId,
        comment,
        rating
    })
    return res.status(201).json({message:"success",review});
}) 

export const updateReview=asyncHandler(async (req,res,next)=>{
    const {productId,reviewId}=req.params;
    const review=await reviewModel.findByIdAndUpdate({
        _id:reviewId,
        createdBy:req.user._id,
        productId:productId},req.body
        ,{new:true});
    return res.status(201).json({message:"success",review});
}) 

