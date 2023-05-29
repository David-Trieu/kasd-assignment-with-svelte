import { Category } from "./category.js";
import {poiStore} from "./poi-store.js";


export const categoryStore = {
    
    async getAllCategories() {
        const categories = await Category.find().lean();
        return categories;
    },

    async getCategoryById(id) {
        if (id) {
            const returnedcategory = await Category.findOne({ _id: id }).lean();
            if (returnedcategory) {
                returnedcategory.pois = await poiStore.getPOIByCategoryId(returnedcategory.id);
            }
            return returnedcategory;
        }
        return null;
    },

    async addCategory(id, category) {
        category.createdBy = id;
        const newCategory = new Category(category);
        const categoryObj = await newCategory.save();
        return this.getCategoryById(categoryObj._id);
    },

    async getCategoryCreatedById(id) {
        const category = await Category.find({ createdById: id }).lean();
        return category;
    },

    async deleteCategoryById(id) {
        try {
            await Category.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllCategories() {
        await Category.deleteMany({});
    }
};
