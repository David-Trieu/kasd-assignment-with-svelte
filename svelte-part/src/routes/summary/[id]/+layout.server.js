import {placemarkService} from "../../../services/placemarkService.ts";

export const load = async ({ params }) => {
    const result =  await placemarkService.getPOIById(params.id);
    const categories = await placemarkService.getAllCategories();

    return {
        id: params.id,
        poi: result,
        category: categories
    }

}