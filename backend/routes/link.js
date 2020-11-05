const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getLink,
  createLink,
  updateLink,
  deleteLink,
} = require("../controllers/link");

router.route("/").post(protect, createLink);

router
  .route("/:id")
  .put(protect, updateLink)
  .delete(protect, deleteLink)
  .get(protect, getLink);

module.exports = router;
