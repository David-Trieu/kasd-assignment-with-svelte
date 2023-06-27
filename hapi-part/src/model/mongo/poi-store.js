import { POI } from "./poi.js";
import {userStore} from "./user-store.js";

export const poiStore = {
    async getAllPOIs() {
        const POIs = await POI.find().lean();
        return POIs;
    },
    async getPOIByCategoryId(id){
        if (id) {
            const POIByCategoryId = await POI.find({ categoryId: id }).lean();
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
    async updatePOI(oldPOI, updatedPOI) {
        const changePOI = await POI.findOne({_id: oldPOI._id});
        changePOI.name = updatedPOI.name
        changePOI.description = updatedPOI.description
        changePOI.location.latitude = updatedPOI.location.latitude
        changePOI.location.longitude = updatedPOI.location.longitude
        changePOI.img = updatedPOI.img
        changePOI.categoryId = updatedPOI.categoryId
        changePOI.categoryName = updatedPOI.categoryName
        changePOI.createdBy = updatedPOI.createdBy
        await changePOI.save();
    },
    async uploadImage(poi, img){
        const newpoi = await POI.findOne({ _id: poi._id });
        newpoi.img.push(img);
        await newpoi.save();
    },
    async deleteImage(poi){
        const newpoi = await POI.findOne({ _id: poi._id });
        newpoi.img = [];
        await newpoi.save();
    }
}


;
