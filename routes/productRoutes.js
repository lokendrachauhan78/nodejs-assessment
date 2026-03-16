const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const auth = require("../middlewares/authMiddleware");
const ROLE = require("../config/roles");
const upload = require("../utils/upload");

router.post("/create", auth([ROLE.ADMIN,ROLE.EMP]), upload.single("image"),  ProductController.create);
router.get("/list", auth([ROLE.ADMIN,ROLE.EMP]), ProductController.list);
router.put("/update/:id", auth([ROLE.ADMIN,ROLE.EMP]), upload.single("image"), ProductController.update);
router.delete("/delete/:id", auth([ROLE.ADMIN,ROLE.EMP]), ProductController.delete);

module.exports = router;