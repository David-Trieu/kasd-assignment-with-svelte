import { category } from "./category.js";
import {poiStore} from "./poi-store.js";


export const categoryStore = {
    
    async getAllCategories() {
        const categories = await category.find().lean();
        return categories;
    },

    async getCategoryById(id) {
        if (id) {
            const category = await category.findOne({ _id: id }).lean();
            if (category) {
                category.pois = await poiStore.getPOIByCategoryId(category._id);
            }
            return category;
        }
        return null;
    },

    async addCategory(category) {
        const newCategory = new category(category);
        const categoryObj = await newCategory.save();
        return this.getCategoryById(categoryObj._id);
    },

    async getCategoryCreatedById(id) {
        const category = await category.find({ createdById: id }).lean();
        return category;
    },

    async deleteCategoryById(id) {
        try {
            await category.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllCategories() {
        await category.deleteMany({});
    }
};
