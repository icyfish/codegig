const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get git list
router.get("/", (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", { gigs });
    })
    .catch(err => console.log("get /", err));
});

// display an add gig form
router.get("/add", (req, res) => {
  res.render("add");
});

// add a gig
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = [];
  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  // check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }
    // lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    // Insert into table
    Gig.create({ title, technologies, budget, description, contact_email })
      .then(gig => res.redirect("/gigs"))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get("/search", (req, res) => {
  let { term } = req.query;

	term = term.toLowerCase();
  Gig.findAll({
    // anywhere
    where: { technologies: { [Op.like]: `%${term}%` } }
  })
    .then(gigs => res.render("gigs", { gigs }))
    .catch(err => console.log(err));
});
module.exports = router;
