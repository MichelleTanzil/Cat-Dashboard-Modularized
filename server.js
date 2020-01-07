const express = require("express");
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

//Database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongoose_dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
require("./server/config/mongoose.js");

const flash = require("express-flash");
app.use(flash());

app.use(express.static(__dirname + "/client/static"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/client/views");
app.use(express.urlencoded({ extended: true }));

//Routes
require("./server/config/routes.js")(app);

//Port
app.listen(8000, () => console.log("listening on port 8000"));