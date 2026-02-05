import Category from '../models/category.js'

const category = async(req, res) =>{
    try{const categories = await Category.find();
      
    res.status(200).json({
        success: true,
        data: categories,
    });}
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message,
        })
    }
}

export default category