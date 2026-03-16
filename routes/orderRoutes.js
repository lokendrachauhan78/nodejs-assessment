const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const auth = require("../middlewares/authMiddleware");
const ROLE = require("../config/roles");

router.post("/",auth([ROLE.ADMIN,ROLE.EMP]),OrderController.create);
router.get("/my-orders",auth([ROLE.ADMIN,ROLE.EMP]),OrderController.myOrders);


module.exports = router;