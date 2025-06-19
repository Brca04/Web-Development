const express = require("express");
const router = express.Router();
const data = require("../data/mydata.js");

router.get("/getCategories", (req, res) => {
  const categories = data.categories.map(cat => cat.name);
  res.render("home", {
    categories,
    products: [],
    cartCount: req.session.cart ? req.session.cart.reduce((sum, p) => sum + p.quantity, 0) : 0,
    cart: req.session.cart || [],
  });
});

router.get("/getProducts/:id", (req, res) => {
  const catIndex = parseInt(req.params.id);
  const category = data.categories[catIndex];

  if (!category) return res.status(404).send("Kategorija nije pronađena");

  const products = category.products.map((prod, i) => ({
    ...prod,
    id: catIndex * 100 + i,
    category: category.name,
  }));

  const categories = data.categories.map(cat => cat.name);

  res.render("home", {
    categories,
    products,
    cartCount: req.session.cart ? req.session.cart.reduce((sum, p) => sum + p.quantity, 0) : 0,
    cart: req.session.cart || [], 
  });
});

module.exports = router;