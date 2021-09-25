const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const { validateParam } = require("../middleware/validateMiddleware.js");

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/signup", authController.signup_get);
router.post("/signup", validateParam(), authController.signup_post);

module.exports = router;
