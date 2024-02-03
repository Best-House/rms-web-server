import { getHTTPClientInstance as getKyHTTPClient } from "./KyHTTPClient";
import { MaterialAPIClient } from "@/external-interfaces/api/MaterialAPIClient";
import { PurchaseAPIClient } from "@/external-interfaces/api/PurchaseAPIClient";

export function getHTTPClientInstance() {
  return getKyHTTPClient();
}

export function getMaterialAPIClient() {
  return new MaterialAPIClient(getHTTPClientInstance());
}

export function getPurchaseAPIClient() {
  return new PurchaseAPIClient(getHTTPClientInstance());
}
