import { writable } from "svelte/store";

export const loggedInUser = writable({
    email: "",
    token: "",
    _id: ""
});