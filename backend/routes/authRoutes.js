const express = require("express");
const router = express.Router();   // ⚠️ très important

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;