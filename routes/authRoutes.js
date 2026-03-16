const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const auth = require("../middlewares/authMiddleware");
const ROLE = require("../config/roles");


router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.get("/list",auth([ROLE.ADMIN,ROLE.EMP]),AuthController.list);
router.put("/update/:id",auth([ROLE.ADMIN]),AuthController.update);
router.delete("/delete/:id",auth([ROLE.ADMIN]),AuthController.delete);


module.exports = router;