import API from "API";

export const getDevice = (params) => API.get("devices", { params: params });
export const addDevice = (payload) => API.post("devices", payload);
