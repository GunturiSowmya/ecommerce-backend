import Wishlist from '../models/wishlist.js'

export const addToWishlist = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const alreadyExists = wishlist.items.some(
        item => item.product.toString() === productId
      );

      if (alreadyExists) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }

      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    await wishlist.populate("items.product");
   
    res.status(200).json({ items: wishlist.items });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};


export const getWishlist = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
const wishlist = await Wishlist.findOne({ user: userId })
  .populate({
    path: "items.product",
    model: "Product"
  });
   // optional if items reference Product
    //console.log(wishlist);
    if (!wishlist) {
      return res.json({ items: [] });
    }
    console.log(wishlist.items)
    res.json({ items: wishlist.items });

  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const removeItem = async (req, res) => {
  try {
    //console.log("BODY:", req.body);

const productId = req.body?.productId;
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          items: {
            product: productId
          }
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Removed successfully",
      items: updatedWishlist?.items || []
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
