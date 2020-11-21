import API from "API";

function createGateWay(gatewayData) {
  return API.post("gateway", gatewayData);
}

export { createGateWay };
