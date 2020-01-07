const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");
module.exports = {
  index: function(req, res) {
    Cat.find()
      .then(cats => {
        // logic with users results
        console.log(cats);
        res.render("index", { cats: cats });
      })
      .catch(err => res.json(err));
  },
  create_view: function(req, res) {
    res.render("newcat");
  },
  create: function(req, res) {
    const cat = new Cat(req.body);
    cat
      .save()
      .then(() => res.redirect("/"))
      .catch(err => {
        console.log("We have an error!", err);
        // adjust the code below as needed to create a flash message with the tag and content you would like
        for (var key in err.errors) {
          req.flash("new_cat", err.errors[key].message);
        }
        res.redirect("/cats/new");
      });
  },
  catinfo: function(req, res) {
    console.log("cat id: " + req.params.id);
    Cat.findOne({ _id: req.params.id })
      .then(cat => {
        console.log(cat);
        res.render("catinfo", { cat: cat });
      })
      .catch(err => res.json(err));
  },
  destroy: function(req, res) {
    console.log("cat id: " + req.params.id);
    Cat.remove({ _id: req.params.id })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => res.json(err));
  },
  edit_view: function(req, res) {
    console.log("cat id: " + req.params.id);
    Cat.findOne({ _id: req.params.id })
      .then(cat => {
        console.log(cat);
        res.render("editcat", { cat: cat });
      })
      .catch(err => res.json(err));
  },
  edit: function(req, res) {
    console.log("cat id: " + req.params.id);
    Cat.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        age: req.body.age,
        color: req.body.color,
        favorite_food: req.body.favorite_food,
        img_link: req.body.img_link
      }
    )
      .then(result => {
        console.log("result: " + JSON.stringify(result));
        res.redirect(`/cats/${result._id}`);
      })
      .catch(err => {
        console.log("We have an error!", err);
        // adjust the code below as needed to create a flash message with the tag and content you would like
        for (var key in err.errors) {
          req.flash("edit_cat", err.errors[key].message);
        }
        res.redirect(`/cats/edit/${cat._id}`);
      });
  }
};
