import { POI } from "./poi.js";
import {userStore} from "./user-store.js";

export const poiStore = {
    async getAllPOIs() {
        const POIs = await POI.find().lean();
        return POIs;
    },
    async getPOIByCategoryId(id){
        if (id) {
            const POIByCategoryId = await POI.findOne({ CategoryId: id }).lean();
            return POIByCategoryId;
        }
        return null;
    },
    async getPOIById(id) {
        if (id) {
            const POIById = await POI.findOne({ _id: id }).lean();
            return POIById;
        }
        return null;
    },
    async getPOICreatedById(id) {
        if (id) {
            const POIByUserId = await POI.findOne({ createdById: id }).lean();
            return POIByUserId;
        }
        return null;
    },
    async addPOI(userid, inputPoi) {
        inputPoi.createdBy = userid;
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
    },
    async updatePOI(updatedPOI) {
        const changePOI = await POI.findOne({_id: updatedPOI._id});
        changePOI.title = updatedPOI.title;
        changePOI.img = updatedPOI.img;
        await changePOI.save();
    },

};
