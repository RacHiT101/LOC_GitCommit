const { Schema, model } = require("mongoose")

const productSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  url: {
    required: false,
    type: String
  }
})

const Product = model("Product", productSchema)

module.exports = Product
