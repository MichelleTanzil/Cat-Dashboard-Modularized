const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");
var cats = require("../controllers/cats.js");
module.exports = function(app) {
  app.get("/", (req, res) => {
    cats.index(req, res);
  });

  app.get("/cats/new", (req, res) => {
    cats.create_view(req, res);
  });

  app.post("/cats", (req, res) => {
    cats.create(req, res);
  });

  app.get("/cats/:id", (req, res) => {
    cats.catinfo(req, res);
  });

  app.post("/cats/destroy/:id", (req, res) => {
    cats.destroy(req, res);
  });

  app.get("/cats/edit/:id", (req, res) => {
    cats.edit_view(req, res);
  });

  app.post("/cats/edit/:id", (req, res) => {
    cats.edit(req, res);
  });
};
