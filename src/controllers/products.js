'use strict';

import Product from '../models/product';

function index (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error while getting products: ${err}` });
    if (!products) return res.status(404).send({ message: `Products do not exist` });

    res.status(200).send({ products });
  });
}

function show (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error while getting product: ${err}` });
    if (!product) return res.status(404).send({ message: `Product does not exist` });

    res.status(200).send({ product });
  });
}

function create (req, res) {
  let product         = new Product();
  product.name        = req.body.name;
  product.picture     = req.body.picture;
  product.price       = req.body.price;
  product.category    = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) return res.status(500).send({ message: `Error while saving product in database: ${err}` });

    res.status(200).send({ product: productStored });
  });
}

function update (req, res) {
  let productId = req.params.productId;

  Product.findByIdAndUpdate(productId, req.body, (err, productUpdated) => {
    if (err) return res.status(500).send({ message: `Error while updating product: ${err}` });
    if (!productUpdated) return res.status(404).send({ message: `Product does not exist` });

    res.status(200).send({ product: productUpdated });
  });
}

function destroy (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error while deleting product: ${err}` });
    if (!product) return res.status(404).send({ message: `Product does not exist` });

    product.remove(err => {
      if (err) return res.status(500).send({ message: `Error while deleting product: ${err}` });
      
      res.status(200).send({ message: `Product with id=${productId} was deleted` });
    });
  });
}

export default {
  index,
  show,
  create,
  update,
  destroy
};
