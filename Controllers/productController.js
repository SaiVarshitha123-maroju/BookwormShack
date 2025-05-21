import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import dictionaryModel from "../models/SearchModel.js";
import categoryModel from "../models/categoryModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, description, category } = req.fields;
    const { pdf } = req.files;
    if (!name) {
      return res.status(500).send({
        error: "Name is required",
      });
    }
    if (!description) {
      return res.status(500).send({
        error: "Description is required",
      });
    }
    if (!category) {
      return res.status(500).send({
        error: "Category is required",
      });
    }
    if (!pdf) {
      return res.status(500).send({
        error: "Book in pdf format is required",
      });
    }
    console.log("PDF File Details:", pdf);
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (pdf) {
      products.pdf.data = fs.readFileSync(pdf.path);
      products.pdf.contentType = pdf.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
  } catch (error) {
    console.log("Error in product creation: ", error);
    res.status(500).send({
      success: false,
      message: "Error in creation of product",
      error: error.message || "Unknown error",
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const { name, description, category } = req.fields;
    const { pdf } = req.files;
    if (!name) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "category is required" });
    }
    if (!pdf) {
      return res.status(500).send({ error: "pdf is required" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (pdf) {
      products.pdf.data = fs.readFileSync(pdf.path);
      products.pdf.contentType = pdf.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updating product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(201).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting single product",
      error,
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      Totalcount: products.length,
      message: "products List",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting product",
      error,
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("pdf");
    res.status(201).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting category",
      error,
    });
  }
};
export const getProductPdf = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel.findOne({ slug }).select("pdf");

    if (!product || !product.pdf || !product.pdf.data) {
      return res.status(404).send({
        success: false,
        message: "PDF not found",
      });
    }

    res.contentType(product.pdf.contentType);
    res.send(product.pdf.data);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching PDF",
      error: error.message,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSearchwordController = async (req, res) => {
  try {
    const { word, meaning } = req.body;
    if (!word) {
      return res.status(500).send({
        error: "word is required",
      });
    }
    if (!meaning) {
      return res.status(500).send({
        error: "meaning is required",
      });
    }
    const dictionary = new dictionaryModel({ ...req.body });
    await dictionary.save();
    res.status(201).send({
      success: true,
      message: "meaning created successfully",
      dictionary,
    });
  } catch (error) {
    console.log("Error in meaning creation: ", error);
    res.status(500).send({
      success: false,
      message: "Error in creation of meaning",
      error: error.message || "Unknown error",
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const word = req.params.word;
    const meaning_word = await dictionaryModel.find({ word: word });
    res.status(201).send({
      success: true,
      message: "fetched meaning success",
      meaning_word,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting fetched meaniong false",
      error,
    });
  }
};

export const getRandomWordController = async (req, res) => {
  try {
    const count = await dictionaryModel.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomWord = await dictionaryModel.findOne().skip(random);
    res.json(randomWord);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
