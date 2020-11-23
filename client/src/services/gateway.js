import API from "API";

export const getGateways = (params) => API.get("gateways", { params: params });

export const addGateway = (payload) => API.post("gateways", payload);

export const deleteGateway = (id) => API.delete(`gateways/${id}`);
