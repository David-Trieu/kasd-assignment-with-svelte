import Mongoose from "mongoose";

import {User} from "./user.js";
import {category} from "./category.js";

const { Schema } = Mongoose;

const poiSchema = new Schema({
    name:String,
    Location:
        {
            latitude: Number,
            longitude: Number,
        },
    Description:String,
    Img: String,

    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },

    createdById: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

export const POI = Mongoose.model("poi", poiSchema);