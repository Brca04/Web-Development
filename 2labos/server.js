const path = require("path");
const express = require("express");
const session = require("express-session");

const homeRoutes = require("./routes/home.routes.js");
const cartRoutes = require("./routes/cart.routes.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "tajna",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/home", homeRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.redirect("/home/getCategories");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});