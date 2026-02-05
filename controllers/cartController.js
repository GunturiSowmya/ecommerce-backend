
import Cart from '../models/cart.js'

export const addToCart = async(req,res) => {
    try{
         if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
        const userId = req.user.id;
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({user: userId});
        
        if(!cart){
            cart = new Cart({
                user: userId,
                items: [{product: productId, quantity}]
            });
        }else{
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }else{
                cart.items.push({product: productId,quantity})
            }
        }
        
        await cart.save();
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({message: "Failed to add to cart"});
    }
}

export const getCartData = async(req,res) => {
    try{
       const userId = req.user.id;
       const cart = await Cart.findOne({user: userId}).populate("items.product");

       if(!cart){
        return res.status(200).json({items: []});
       }

       res.status(200).json(cart)
       console.log(cart)
    }catch(error){
    res.status(500).json({ message: "Failed to fetch cart" });
    }
}