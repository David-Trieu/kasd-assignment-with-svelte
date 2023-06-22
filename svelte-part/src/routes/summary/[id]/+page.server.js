import {placemarkService} from "../../../services/placemarkService.ts";

export const load = async ({ params }) => {
    const result =  await placemarkService.getPOIById(params.id);

    return {
        id: params.id,
        poi: result
    }

}