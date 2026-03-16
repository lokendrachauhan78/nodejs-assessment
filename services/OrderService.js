const Order = require("../models/Order");
const Cart = require("../models/Cart");

class OrderService {

    async createOrder(userId){

        const cartItems = await Cart
            .find({user:userId})
            .populate("product");

        let total = 0;

        const products = cartItems.map(item=>{

            total += item.product.price * item.quantity;

            return {
                product:item.product._id,
                quantity:item.quantity
            }

        });

        const order = new Order({
            user:userId,
            products,
            total
        });

        await Cart.deleteMany({user:userId});

        return await order.save();
    }

    async getOrders(userId){

        return await Order
            .find({user:userId})
            .populate("products.product");

    }


}

module.exports = new OrderService();