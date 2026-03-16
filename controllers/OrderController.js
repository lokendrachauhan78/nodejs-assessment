const OrderService = require("../services/OrderService");
const Validator = require("validatorjs");

class OrderController {

    async create(req,res){
        
        const order = await OrderService.createOrder(req.user.id);

        res.json(order);
    }

    async myOrders(req,res){

        const orders = await OrderService.getOrders(req.user.id);

        res.json(orders);
    }


}

module.exports = new OrderController();