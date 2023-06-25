import Joi from "joi";
//The variablenames you use are the ones you use in the handlebars forms/inputs!

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
            email: Joi.string().email().example("t1@t.com").required(),
            password: Joi.string().example("t").required(),
    }).label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
        userName: Joi.string().example("Tester").required(),
        hasAdminRights: Joi.boolean().example(false),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
        _id: IdSpec,
        __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
////////////////////////////////////////////////////////////////////////////////////////
export const POISpec= Joi.object()
    .keys({
        name: Joi.string().required().example("asdsaddsa"),
        description: Joi.string().required().allow("").example("fdgfggffdgfgd"),
        categoryName: Joi.string().allow(""),
        category: Joi.any().optional(),
        categoryId: IdSpec,
        createdBy: IdSpec,
        img: Joi.array().optional(),
    })
export const POISpecPlusLocation = POISpec.keys({
    _id: IdSpec,
    __v: Joi.number().optional(),
    location:{
        latitude: Joi.number().min(-90).max(90).example(1),
        longitude: Joi.number().min(-180).max(180).example(1),
    }
}).label("POIDetailsPlus");

export const POILocationSpec=POISpec.keys({
    latitude: Joi.number().min(-90).max(90).example(1),
    longitude: Joi.number().min(-180).max(180).example(1),
}).label("POILocation")

//////////////////////////////////////////////////////////////////////////////////////////////
export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
        id: IdSpec,
    })
    .label("JwtAuth");