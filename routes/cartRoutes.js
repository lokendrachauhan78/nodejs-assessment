const express = require("express");
const router = express.Router();

const CartController = require("../controllers/CartController");
const auth = require("../middlewares/authMiddleware");
const ROLE = require("../config/roles");

router.post("/",auth([ROLE.ADMIN,ROLE.EMP]),CartController.add);
router.get("/",auth([ROLE.ADMIN,ROLE.EMP]),CartController.list);
router.delete("/:id",auth([ROLE.ADMIN,ROLE.EMP]),CartController.remove);

module.exports = router;