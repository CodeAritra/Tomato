import productModel from "../models/Product.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { bookname, price,quantity } = req.body;

    let product = await productModel.create({
      bookname,
      price,
      quantity,
      slug: slugify(bookname),
    });

    res.send({
      success: true,
      message: "Product created succesfully",
      product
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { bookname, price,quantity } = req.body;
    let updatedProduct = await productModel.findOneAndUpdate(
      { id: req.params.id },
      { bookname, price,quantity, slug: slugify(bookname) },
      { new: true }
    );
    if (updateProduct) {
      res.send({
        success:true,
        message:"Updated successfully",
        updatedProduct
      });
    }
  } catch (error) {
    res.send({success:false,
      message:error});
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let product = await productModel.findByIdAndDelete(req.params.pid);
    res.send({success:true,message:"Successfully deleted"});
  } catch (error) {
    res.send(error);
  }
};

export const allproducts = async (req, res) => {
  try {
    let allproducts = await productModel.find({});
    if (allproducts) {
      res.send({success:true,allproducts});
    } else {
      res.send("No items");
    }
  } catch (error) {
    res.send(error);
  }
};

export const product = async (req, res) => {
  try {
    let product = await productModel.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.send("Not found");
    }
  } catch (error) {
    res.send(error);
  }
};
