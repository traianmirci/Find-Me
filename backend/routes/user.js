const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userPhotoUpload,
  getProfile,
} = require("../controllers/user");

router.route("/").post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.route("/:id/photo").put(protect, userPhotoUpload);
router.route("/profile/:username").get(getProfile);
module.exports = router;
