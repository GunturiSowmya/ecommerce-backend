import Products from "../models/products.js";
import mongoose from 'mongoose'


export const getCategoryProducts = async (req, res) => {
  try {
    let { category, subcategory } = req.query;
//console.log(category+" "+subcategory);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    

    let filter = { category };

    // Only apply subcategory filter if it is provided
    if (subcategory && subcategory.trim() !== "") {
      filter.subcategory = subcategory.toLowerCase();
    }

    const products = await Products.find(filter);

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const { keyword} = req.query;
    console.log(keyword);
    let filter = {};

    if (keyword) {
      filter.$or= [{title: {$regex: keyword, $options: "i"}},
        {info: {$regex: keyword, $options: "i"}},
       {category: {$regex: keyword, $options: "i"}}
      ];
    }

    console.log("filter",filter);

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

/*export const getProduct = async(req, res) => {
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
}*/

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