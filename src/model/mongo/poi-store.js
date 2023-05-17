import { POI } from "./poi.js";
import {userStore} from "./user-store.js";

export const poiStore = {
    async getAllPOIs() {
        const POIs = await POI.find().lean();
        return POIs;
    },

    async getPOIById(id) {
        if (id) {
            const POIById = await POI.findOne({ _id: id }).lean();

            return POIById;
        }
        return null;
    },
    async getPOIByUser(user) {
        if (user) {
            const POIByUser = await POI.findOne({ createdBy: user }).lean();

            return POIByUser;
        }
        return null;
    },
    async addPOI(inputPoi) {
        const newPOI = new POI(inputPoi);
        const poiObj = await newPOI.save();
        return this.getPOIById(poiObj._id);
    },
    async deletePOIById(id) {
        try {
            await POI.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPOIs() {
        await POI.deleteMany({});
    }
};
