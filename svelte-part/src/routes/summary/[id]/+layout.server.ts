import {placemarkService} from "../../../services/placemarkService.ts";
import type {Category, POI} from "../../../services/placemark-types";

export const load = async ({ params }) => {
    const result =  await placemarkService.getPOIById(params.id);
    const categories = await placemarkService.getAllCategories();

    return {
        id: <string> params.id,
        poi:<POI> result,
        category:<Category> categories,
    }

}