import { getHTTPClientInstance as getKyHTTPClient } from "./KyHTTPClient";
import { MaterialAPIClient } from "@/external-interfaces/api/MaterialAPIClient";

export function getHTTPClientInstance() {
  return getKyHTTPClient();
}

export function getMaterialAPIClient() {
  return new MaterialAPIClient(getHTTPClientInstance());
}
