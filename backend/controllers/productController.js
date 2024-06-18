import productModel from "../models/Product.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    let product = await productModel.create({
      name,
      description,
      price,
      slug: slugify(name),
    });

    if (product) {
      res.send(product);
      console.log(product);
    }
  } catch (error) {
    res.send(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    let updatedProduct = await productModel.findOneAndUpdate(
      { slug: req.params.slug },
      { name, description, price, slug: slugify(name) },
      { new: true }
    );
    if(updateProduct){
        res.send(updatedProduct)
    }
  } catch (error) {
    res.send(error);
  }
};

export const deleteProduct = async(req,res) => {
    try {
        let product = await productModel.findByIdAndDelete(req.params.pid)
        res.send("Successfully deleted")
    } catch (error) {
        res.send(error)
    }
};

export const allproducts = async(req,res)=>{
    try {
        let allproducts = await productModel.find({})
        if(allproducts){
            res.send(allproducts)
        }
        else{
            res.send("No items")
        }
    } catch (error) {
        res.send(error)
    }
}

export const product = async(req,res)=>{
    try {
        let product = await productModel.findOne({slug:req.params.slug})
        if(product){
            res.send(product)
        }
        else{
            res.send("Not found")
        }
    } catch (error) {
        res.send(error)
    }
}