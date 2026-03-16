const Category = require("../models/Category");

class CategoryService{

    async create(data){
        const category = new Category(data);
        return await category.save();
    }

    async getAll(){
        return await Category.find().populate("parent");
    }

     async update(id,data){

        return await Category.findByIdAndUpdate(
            id,
            {
                name: data.name,
                parent: data.parent
            },
            { new:true }
        );

    }

    // DELETE CATEGORY
    async delete(id){

        return await Category.findByIdAndDelete(id);

    }

}

module.exports = new CategoryService();