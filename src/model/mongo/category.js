import Mongoose from "mongoose";
import {User} from "./user.js";

const { Schema } = Mongoose;

const categorySchema = new Schema({
    title: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

export const Category = Mongoose.model("category", categorySchema);
