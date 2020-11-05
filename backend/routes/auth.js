const express = require("express");
const {
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logOut,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get("/logout", protect, logOut);

module.exports = router;
