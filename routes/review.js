const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewControllers = require("../controllers/reviews");

//Reviwes:
// POST route to add a review to a listing
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));

//delete- review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.deleteReview));

module.exports = router;