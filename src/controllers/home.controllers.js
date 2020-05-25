const Home = require("../models/home.model.js");
// Retrieve and return all homes from the database.
exports.findAll = (req, res) => {
  Home.find()
    .then((homes) => {
      res.send(homes);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of homes.",
      });
    });
};
// Create and Save a new Home
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Create a new Home
  const home = new Home({
    url: req.body.url,
    description: req.body.description,
    location: req.body.location,
    area: req.body.area,
    year: req.body.year,
    type: req.body.type,
    price: req.body.price,
  });
  // Save home in the database
  home
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new home.",
      });
    });
};
// Find a single Home with a id
exports.findOne = (req, res) => {
  Home.findById(req.params.id)
    .then((home) => {
      if (!home) {
        return res.status(404).send({
          message: "Home not found with id " + req.params.id,
        });
      }
      res.send(home);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Home not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting home with id " + req.params.id,
      });
    });
};
// Update a Home identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Find home and update it with the request body
  Home.findByIdAndUpdate(
    req.params.id,
    {
      url: req.body.url,
      description: req.body.description,
      location: req.body.location,
      area: req.body.area,
      year: req.body.year,
      type: req.body.type,
      price: req.body.price,
    },
    { new: true }
  )
    .then((home) => {
      if (!home) {
        return res.status(404).send({
          message: "home not found with id " + req.params.id,
        });
      }
      res.send(home);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "home not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating home with id " + req.params.id,
      });
    });
};
// Delete a Home with the specified id in the request
exports.delete = (req, res) => {
  Home.findByIdAndRemove(req.params.id)
    .then((home) => {
      if (!home) {
        return res.status(404).send({
          message: "home not found with id " + req.params.id,
        });
      }
      res.send({ message: "home deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "home not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete home with id " + req.params.id,
      });
    });
};
