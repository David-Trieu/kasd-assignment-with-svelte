import {userStore} from "./mongo/user-store.js";
import {poiStore} from "./mongo/poi-store.js";
import {categoryStore} from "./mongo/category-store.js";
import {connectMongo} from "./mongo/connect.js";

export const db = {
    userStore: null,
    poiStore: null,
    categoryStore:null,
    init(){
        this.userStore = userStore
        this.poiStore = poiStore
        this.categoryStore = categoryStore
        connectMongo()
    }
}