import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/Middleware.js";
import formidable from "express-formidable";
import {
  createProductController,
  createSearchwordController,
  deleteProductController,
  getAllProductsController,
  getProductPdf,
  getRandomWordController,
  getSingleProductController,
  productCategoryController,
  searchController,
  updateProductController,
} from "../Controllers/productController.js";

const router = express.Router();
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-single-product/:slug", getSingleProductController);
router.get("/get-all-products", getAllProductsController);
router.get("/product-details/:slug", getProductPdf);
router.post("/create-searchword", createSearchwordController);
router.get("/search/:word", searchController);
router.get("/randomword", getRandomWordController);
router.get("/product-category/:slug", productCategoryController);
router.delete("/delete-product", deleteProductController);
export default router;
