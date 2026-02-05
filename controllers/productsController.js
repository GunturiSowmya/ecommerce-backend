import Products from "../models/products.js";
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
  try {
    const { category} = req.query;

    let filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };

    }


    const products = await Products.find(filter);
    
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async(req, res) => {
  try{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Products.findById(id);
  
    if(!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
   
    return res.status(200).json({
      success: true,
      data: product,
    });
  }catch(error){
    console.log("Get Product Error: ",error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}
