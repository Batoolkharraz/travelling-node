import { Router } from "express";
import * as reviewCont from './controller/review.controller.js';
import auth from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./review.endPoint.js";

const router = Router();

router.post('/:productId',auth(endPoint.create),reviewCont.createReview);
router.patch('/:productId/:reviewId',auth(endPoint.update),reviewCont.updateReview);
export default router;