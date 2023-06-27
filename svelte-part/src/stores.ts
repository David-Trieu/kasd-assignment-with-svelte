import { writable } from "svelte/store";
import type {LoggedInUser, outputPOI} from "./services/placemark-types.ts";

export const loggedInUser = writable<LoggedInUser>();
export const latestPOI = writable<outputPOI>();
export const latestChart = writable<string>(null);