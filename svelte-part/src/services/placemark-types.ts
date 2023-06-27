export interface User {
    userName: string;
    email: string;
    password: string;
    _id: string;
    hasAdminRights: boolean;
}

export interface LoggedInUser{
    email: string;
    token: string;
    _id: string;
}

export interface POI {
    name:   string;
    location:
        {
            latitude: number;
            longitude: number;
        },
    description: string;
    categoryId: string;
    categoryName: string;
}
export interface outputPOI extends POI{
    img: string[];
    createdBy: string;
    _id: string;
}

export interface Category {
    _id: string;
    name: string;
    createdBy: string;
}
export interface mapConfig_type{
    location: { lat: number, lng: number },
    zoom: number,
    minZoom: number
};
