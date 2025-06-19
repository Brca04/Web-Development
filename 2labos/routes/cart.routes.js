const express = require("express");
const router = express.Router();
const data = require("../data/mydata.js");

function findProductById(id) {
  const catIndex = Math.floor(id / 100);
  const prodIndex = id % 100;

  if (
    data.categories[catIndex] &&
    data.categories[catIndex].products[prodIndex]
  ) {
    const product = data.categories[catIndex].products[prodIndex];
    return {
      id,
      name: product.name,
      image: product.image,
      category: data.categories[catIndex].name,
    };
  }
  return null;
}

router.post("/add/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!req.session.cart) req.session.cart = [];

  const existing = req.session.cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    const product = findProductById(id);
    if (!product) return res.sendStatus(404);
    req.session.cart.push({ ...product, quantity: 1 });
  }
  res.sendStatus(204);
});

router.post("/remove/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!req.session.cart) req.session.cart = [];

  const index = req.session.cart.findIndex((item) => item.id === id);

  if (index !== -1) {
    req.session.cart[index].quantity--;

    if (req.session.cart[index].quantity <= 0) {
      req.session.cart.splice(index, 1);
    }
  }

  res.sendStatus(204);
});

router.get("/getAll", (req, res) => {
  res.render("cart", {
    cartItems: req.session.cart || [],
    cartCount: req.session.cart
      ? req.session.cart.reduce((sum, p) => sum + p.quantity, 0)
      : 0,
  });
});

module.exports = router;
