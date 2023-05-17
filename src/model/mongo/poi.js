import Mongoose from "mongoose";

import {User} from "./user.js";

const { Schema } = Mongoose;

const poiSchema = new Schema({
    name:String,
    Location:
        {
            latitude: Number,
            longitude: Number,
        },
    Description:String,
    Category: String,
    Img: String,
    createdBy: User,
});

export const POI = Mongoose.model("poi", poiSchema);