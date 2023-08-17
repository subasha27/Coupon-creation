const express = require("express");
const router = express.Router();
const functi = require("../Controller/function");

router.post('/createCoupon',functi.createCoupon);
router.put('/createCoupon/:id',functi.couponUpdate);
router.delete('/createCoupon/:id',functi.couponDelete);
router.get('/createCouponGet/:id',functi.couponGet);
router.get('/createCouponGetAll',functi.couponGetAll);
router.get('/createCouponValid',functi.couponValid);


module.exports = router;