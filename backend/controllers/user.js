const User = require('../models/User');
const Link = require('../models/Link');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

// @desc    Get a user
// @route   GET /api/v1/user/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    next(new ErrorResponse(`User not found with id:${req.params.id}`, 404));

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get a user profile with links included
// @route   GET /api/v1/user/profile/:username
// @access  Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    'links',
    {
      link: 1,
      title: 1,
      active: 1,
    }
  );
  // console.log(user.links);
  //const user = await User.findOne({ username: req.params.username });
  //const links = await Link.find({ user: user._id });
  if (!user.user)
    next(new ErrorResponse(`User not found with id:${req.params.id}`, 404));

  console.log(user);

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

// @desc    Create a new user
// @route   POST /api/v1/user/
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update a user
// @route   PUT /api/v1/user/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  // User can only update its own user
  if (req.user._id !== req.params.id) {
    return next(new ErrorResponse(`User not authorized to update`, 401));
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user)
    return next(
      new ErrorResponse(`User not found with id:${req.params.id}`, 404)
    );

  res.status(200).json({ success: true, data: user });
});

// @desc    Delete a user
// @route   DELETE /api/v1/user/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    next(new ErrorResponse(`User not found with id:${req.params.id}`, 404));

  res.status(200).json({ success: true });
});

// @desc    Upload user photo
// @route   PUT /api/v1/user/:id/photo
// @access  Private
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    next(new ErrorResponse(`User not found with id:${req.params.id}`, 404));

  if (!req.files) return next(new ErrorResponse(`Please upload a file`, 400));

  const file = req.files.file;

  if (!file.mimetype.startsWith('image'))
    return next(new ErrorResponse(`Please upload a image file`, 400));

  if (file.size > process.env.MAX_FILE_UPLOAD)
    return next(
      new ErrorResponse(
        `Please upload a image less than ${process.env.MAX_FILE_UPLOAD} `,
        400
      )
    );

  file.name = `photo_${user.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_IMAGE_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
