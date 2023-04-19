import express from "express";
import data from "./data.js";
const app = express();
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => {
    return x.slug === req.params.slug;
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not found" });
  }
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => {
    return x._id === req.params.id;
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not found" });
  }
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("App running");
});
