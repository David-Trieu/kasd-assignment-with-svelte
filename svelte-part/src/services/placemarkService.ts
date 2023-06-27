import axios from "axios";
import { latestPOI,loggedInUser } from "../stores.ts";
import type {Category, inputPOI, outputPOI, POI, User} from "./placemark-types.ts";


export const placemarkService = {
    baseUrl: "http://localhost:3000",

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                loggedInUser.set({
                    email: email,
                    token: response.data.token,
                    _id: response.data.id
                });
                localStorage.placemark = JSON.stringify({ email: email, token: response.data.token, id: response.data.id  });
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async logout() {
        loggedInUser.set({
            email: "",
            token: "",
            _id: ""
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("placemark");
    },
    async signup(userName: string,  email: string, password: string): Promise<boolean> {
        try {
            const userDetails = {
                userName: userName,
                email: email,
                password: password
            };
            await axios.post(this.baseUrl + "/api/users", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },
    async getUser(): Promise<User>{
        try {
            const response = await axios.get(`${this.baseUrl}/api/users/one`);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    async getAllUser(): Promise<User[]>{
        try {
            const response = await axios.get(`${this.baseUrl}/api/users`);
            return response.data;
        } catch (error) {
            return [];
        }
    },
    reload() {
        if (!axios.defaults.headers.common["Authorization"]) {
            const placemarkCredentials = localStorage.placemark;
            if (placemarkCredentials) {
                const savedUser = JSON.parse(placemarkCredentials);
                loggedInUser.set({
                    email: savedUser.email,
                    token: savedUser.token,
                    _id: savedUser.id
                });
                axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
            }
        }
    },

    async getAllPOIS(): Promise<outputPOI[]> {
        try {
            const response = await axios.get(this.baseUrl + "/api/pois");
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async addPOI(poi: POI){
        try{
            const response = await axios.post(`${this.baseUrl}/api/users/pois`, poi);
            latestPOI.set(poi);
            return response.status == 200;
        }
        catch (error){
            return false;
        }
    },
    async alterPOI(poi: outputPOI){
        try{
            const response = await axios.post(`${this.baseUrl}/api/pois/${poi._id}/update`, poi);
            return response.status == 200;
        }
        catch (error){
            return false;
        }
    },
    async deletePOI(poi: outputPOI){
        try{
            const response = await axios.delete(`${this.baseUrl}/api/pois/${poi._id}/delete`);
            return response.status == 200;
        }
        catch (error){
            return false;
        }
    },
    async getPOIById(id: string): Promise<outputPOI> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/pois/${id}`);
            return response.data;
        } catch (error) {
            return ;
        }
    },
    async getAllCategories(): Promise<Category[]> {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories");
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async getCategoryById(id: string): Promise<Category> {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories/" + id);
            return response.data;
        } catch (error) {
            return ;
        }
    },
    async getAllImages(): Promise<string[]> {
        try {
            const response = await axios.get(this.baseUrl + "/api/images");
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async uploadImage(id: string, imagefile: File[]): Promise <boolean>{
        try {
            const response = await axios.post(`${this.baseUrl}/api/images/${id}/upload`, imagefile);
            return response.data;
        } catch (error) {
            return false;
        }
    },
    async deleteImage(id: string): Promise<boolean>{
        try {
            const response = await axios.delete(`${this.baseUrl}/api/images/${id}/delete`);
            return response.data;
        } catch (error) {
            return false;
        }
    }


};
