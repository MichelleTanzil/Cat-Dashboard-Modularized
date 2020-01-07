const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required for this cat."],
    minlength: [2, "Name has a minimum length of 2 characters."]
  },
  age: {
    type: Number,
    required: [true, "This cat's age is required."],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value."
    }
  },
  color: {
    type: String,
    required: [true, "A color is required for this cat."]
  },
  favorite_food: {
    type: String,
    required: [true, "A favorite food is required for this cat."]
  },
  img_link: {
    type: String,
    required: [true, "An image is required for this cat."]
  }
});
// create an object that contains methods for mongoose to interface with MongoDB
const Cat = mongoose.model("Cat", CatSchema);
