const { Router } = require("express");
const ProductController = require("../controller/productController");


const productTypes = ["background", "music", "profile-image"];

const productController = new ProductController();

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  if (!productTypes.includes(req.query?.type)) {
    res
      .status(400)
      .json(
        `Invalid type: product must be of type [${productTypes.join(", ")}]`
      );
  } else {
    res.json(await productController.findProductsByType(req.query.type));
  }
});

router.get("/one", async (req, res) => {
  res.json(await productController.findProductById(req.query.id));
});

router.post(
  "/",
  async (req, res) => {
    const price = Number(req.body.price);
    if (!productTypes.includes(req.body.type)) {
      res
        .status(400)
        .json(
          `Invalid type: product must be of type [${productTypes.join(", ")}]`
        );
    } else if (isNaN(price) || price < 0) {
      res
        .status(400)
        .json("Invalid price: product price must be non-negative integer");
    } else {
      await productController.createProduct(
        req.body.name,
        req.body.type,
        price,
        req.body.url
      );
      res.status(201).json();
    }
  }
);

module.exports = router;
