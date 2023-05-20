import Mongoose from "mongoose";
import {User} from "./user.js";

const { Schema } = Mongoose;

const categorySchema = new Schema({
    title: String,
    createdById: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

export const category = Mongoose.model("category", categorySchema);
