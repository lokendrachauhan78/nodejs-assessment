const Product = require("../models/Product");

class ProductService{

    async create(data){
        const product = new Product(data);
        return await product.save();
    }

    async getAll(){
        return await Product
            .find()
            .populate("category");
    }

    async update(id,data){

        return await Product.findByIdAndUpdate(
            id,
            data,
            { new:true }
        );

    }
    async delete(id){

        return await Product.findByIdAndDelete(id);

    }

}

module.exports = new ProductService();