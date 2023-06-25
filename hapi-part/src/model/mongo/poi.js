import Mongoose from "mongoose";

import {User} from "./user.js";
import {Category} from "./category.js";

const { Schema } = Mongoose;

const poiSchema = new Schema({
    name:String,
    location:
        {
            latitude: Number,
            longitude: Number,
        },
    description:String,
    img: [String],
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },
    categoryName: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const POI = Mongoose.model("poi", poiSchema);