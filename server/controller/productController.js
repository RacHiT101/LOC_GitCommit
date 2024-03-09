const productModel = require("../models/Product");

class ProductController {
  async findProductById(id) {
    return productModel.findById(id);
  }

  async findProductsByType(type) {
    return productModel.find({ type });
  }

  async createProduct(name, type, price, url) {
    return await productModel.create({ name, type, price, url });
  }
}

module.exports = ProductController;
