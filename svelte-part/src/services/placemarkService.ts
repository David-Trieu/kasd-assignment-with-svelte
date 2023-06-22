import axios from "axios";
import { latestPOI,loggedInUser } from "../stores";


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


    reload() {
        if (!axios.defaults.headers.common["Authorization"]) {
            const placemarkCredentials = localStorage.placemark;
            if (placemarkCredentials) {
                const savedUser = JSON.parse(placemarkCredentials);
                loggedInUser.set({
                    email: savedUser.email,
                    token: savedUser.token,
                    _id: savedUser._id
                });
                axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
            }
        }
    },

    async getAllPOIS() {
        try {
            const response = await axios.get(this.baseUrl + "/api/pois");
            return response.data;
        } catch (error) {
            return [];
        }
    },

    async addPOI(poi){
        const placemarkCredentials = localStorage.placemark;
        if(placemarkCredentials){
            try{
                const savedUser = JSON.parse(placemarkCredentials);
                const response = await axios.post(`${this.baseUrl}/api/users/pois`, poi);
                latestPOI.set(poi);
                return response.status == 200;
            }
            catch (error){
                return false;
            }
        }

    },
    async getPOIById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/api/pois/${id}`);
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async getAllCategories() {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories");
            return response.data;
        } catch (error) {
            return [];
        }
    },
    async getCategoryById(id) {
        try {
            const response = await axios.get(this.baseUrl + "/api/categories/" + id);
            return response.data;
        } catch (error) {
            return [];
        }
    },


};
