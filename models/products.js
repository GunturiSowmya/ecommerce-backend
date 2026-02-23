import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
    },

    info: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        type: String, // image URL or filename
        required: true,
      }
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, // IMPORTANT for category filtering
    },
    subcategory: {
      type: String,
     // IMPORTANT for category filtering
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
)

const Products = mongoose.model('Product', productsSchema)
export default Products
