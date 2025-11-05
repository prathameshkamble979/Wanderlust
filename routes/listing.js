const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); 
const { isLoggedIn, validateListing } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");  
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingsController.index))
.post(isLoggedIn, 
   validateListing,
   upload.single("listing[image]"), 
   wrapAsync(listingsController.createListing));

// NEW route - Show form to create new listing
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingsController.showListing))
.put(validateListing, isLoggedIn,isOwner,  wrapAsync(listingsController.updateListing))
.delete(
   isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingsController.deleteListing));


// EDIT route - Show form to edit a listing
router.get("/:id/edit",isLoggedIn, isOwner,  wrapAsync(listingsController.renderEditForm));


module.exports = router;