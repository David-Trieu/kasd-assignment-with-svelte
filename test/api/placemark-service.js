import axios from "axios";
import {serviceUrl} from "../fixtures.js";

export const placemarkService = {
    placemarkUrl: serviceUrl,

    async createUser(user){
        const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id){
        const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
        return res.data;
    },

    async getAllUsers(){
        try{
            const res = await axios.get(`${this.placemarkUrl}/api/users`);
            return res.data;
        } catch (e) {
            return null;
        }
    },
    async deleteAllUsers(){
        const res = await axios.delete(`${this.placemarkUrl}/api/users`);
        return res.data;
    },

    async createPOI(id, poi){
        const res = await axios.post(`${this.placemarkUrl}/api/users/${id}/pois`, poi);
        return res.data;
    },

    async getPOI(id){
        const res = await axios.get(`${this.placemarkUrl}/api/pois/${id}`);
        return res.data;
    },

    async getAllPOIs(){
        try{
            const res = await axios.get(`${this.placemarkUrl}/api/pois`);
            return res.data;
        } catch (e) {
            return null;
        }
    },

    async deleteAllPOIs(){
        const res = await axios.delete(`${this.placemarkUrl}/api/pois`);
        return res.data;
    },

    async createCategory(id, category){
        const res = await axios.post(`${this.placemarkUrl}/api/users/${id}/categories`, category);
        return res.data;
    },
    async getCategory(id){
        const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
        return res.data;
    },
    async getAllCategories(){
        try{
            const res = await axios.get(`${this.placemarkUrl}/api/categories`);
            return res.data;
        } catch (e) {
            return null;
        }
    },
    async deleteAllCategories(){
        const res = await axios.delete(`${this.placemarkUrl}/api/categories`);
        return res.data;
    },


}