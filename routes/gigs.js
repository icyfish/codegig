const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

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
router.get("/add", (req, res) => {
  const data = {
    title: "Simple Wordpress website",
    technologies: "wordpress, php",
    budget: "$1000",
    description:
      "Magna aute officia labore laborum eiusmod elit aliquip qui non minim sit duis. Ad non esse enim ea. Non ex culpa est sint reprehenderit elit in tempor reprehenderit labore laborum. Eiusmod culpa consectetur aliqua exercitation amet culpa. Nostrud reprehenderit tempor ea duis irure sint eiusmod minim excepteur non deserunt. Ea qui sit aliqua pariatur ut duis commodo officia.",
    contact_email: "user1@gmail.com"
  };

  let { title, technologies, budget, description, contact_email } = data;

  // Insert into table
  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
});
module.exports = router;
