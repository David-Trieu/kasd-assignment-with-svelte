import { writable } from "svelte/store";

export const loggedInUser = writable({
    email: "",
    token: "",
    _id: ""
});
export const latestPOI = writable(null);
export const latestChart = writable(null);