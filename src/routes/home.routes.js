const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controllers");
// Retrieve all homes
router.get("/", homeController.findAll);
// Create a new home
router.post("/", homeController.create);
// Retrieve a single home with id
router.get("/:id", homeController.findOne);
// Update a home with id
router.put("/:id", homeController.update);
// Delete a home with id
router.delete("/:id", homeController.delete);
module.exports = router;
