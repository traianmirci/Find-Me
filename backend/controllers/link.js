const Link = require("../models/Link");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

// @desc    Get a link
// @route   POST /api/v1/link/:id
// @access  Private
exports.getLink = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const link = await Link.findById(req.params.id);

  if (!link) {
    return next(new ErrorResponse(`Link not found`, 404));
  }
  if (link.user !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this link`, 401)
    );
  }

  res.status(201).json({
    success: true,
    data: link,
  });
});

// @desc    Create a new link
// @route   POST /api/v1/link/
// @access  Private
exports.createLink = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const link = await Link.create(req.body);

  if (!link) {
    return next(new ErrorResponse(`Link cannot be created`, 404));
  }

  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { links: link._id },
  });

  res.status(201).json({
    success: true,
    data: link,
  });
});

// @desc    Edit a link
// @route   PUT /api/v1/link/:id
// @access  Private
exports.updateLink = asyncHandler(async (req, res, next) => {
  let link = await Link.findById(req.params.id);

  if (!link) {
    return next(new ErrorResponse(`Link not found`, 404));
  }
  // User can only update its own links
  if (req.user._id != link.user.toString()) {
    return next(
      new ErrorResponse(`User not authorized to update this link`, 401)
    );
  }
  link = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: link,
  });
});

// @desc    Delete a link
// @route   DELETE /api/v1/link/:id
// @access  Private
exports.deleteLink = asyncHandler(async (req, res, next) => {
  let link = await Link.findById(req.params.id);

  if (!link) {
    return next(new ErrorResponse(`Link not found`, 404));
  }
  // User can only delete his own links
  if (req.user._id != link.user.toString()) {
    return next(
      new ErrorResponse(`User not authorized to delete this link`, 401)
    );
  }

  const deleted = await Link.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return next(new ErrorResponse(`Error deleting the link`, 500));
  }

  res.status(200).json({
    success: true,
  });
});
