import Category from '../models/category.js'


export const getCategory = async(req, res) =>{
    try{

    const categories = await Category.find();  
    res.status(200).json({
        success: true,
        data: categories,
    });}
    catch (error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        })
    }
}

export const getSubcategories = async (req, res) => {
  try {
    const { category } = req.query;

    const categoryDoc = await Category.findOne({ title: category });
    // console.log("Category",category)
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.status(200).json({
      subcategories: categoryDoc.subcategories
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

