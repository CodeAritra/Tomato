import productModel from "../models/Product.js";
import slugify from "slugify";
import path from "path";

export const createProduct = async (req, res) => {
  try {
    const { bookname, price, quantity } = req.body;
    const image = req.file;

    let product = await productModel.create({
      bookname,
      price,
      quantity,
      img: image.path,
      slug: slugify(bookname),
    });

    await product.save();
    console.log(product);

    res.send({
      success: true,
      message: "Product created succesfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { bookname, price, quantity } = req.body;
    const image = req.file;

    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // let updatedProduct = await productModel.findOneAndUpdate(
    //   { id: req.params.id },
    //   { bookname, price, quantity,slug:slugify(bookname) },
    //   { new: true }
    // );


    product.bookname = bookname || product.bookname;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.slug =  slugify(bookname);

    
    // Update image if a new one is uploaded
    if (image) {
      product.img = image.path;
    }
    
    // Save updated product to the database
    await product.save();
    
    console.log(product);
    if (product) {
      res.send({
        success: true,
        message: "Updated successfully",
        product,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let product = await productModel.findByIdAndDelete(req.params.pid);
    res.send({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.send(error);
  }
};

export const allproducts = async (req, res) => {
  try {
    let allproducts = await productModel.find({});
    if (allproducts) {
      res.send({ success: true, allproducts });
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
