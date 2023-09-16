import { Router } from "express";
import * as reviewCont from './controller/review.controller.js';
import auth from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./review.endPoint.js";

const router = Router();

router.post('/:tripId',auth(endPoint.createReview),reviewCont.createReview);
router.patch('/:tripId/:reviewId',auth(endPoint.updateReview),reviewCont.updateReview);
router.get('/',auth(endPoint.getReview),reviewCont.getAllReviews);
router.get('/:reviewId',auth(endPoint.getReview),reviewCont.getReview);
router.delete('/:reviewId',auth(endPoint.deleteReview),reviewCont.deleteReview);
export default router;