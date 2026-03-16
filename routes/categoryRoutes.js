const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const auth = require("../middlewares/authMiddleware");
const ROLE = require("../config/roles");

router.post("/create", auth([ROLE.ADMIN,ROLE.EMP]), CategoryController.create);
router.get("/list", auth([ROLE.ADMIN,ROLE.EMP]), CategoryController.list);
router.put("/update/:id", auth([ROLE.ADMIN,ROLE.EMP]), CategoryController.update);
router.delete("/delete/:id", auth([ROLE.ADMIN,ROLE.EMP]), CategoryController.delete);

module.exports = router;