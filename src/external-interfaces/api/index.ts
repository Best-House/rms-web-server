import { getHTTPClientInstance as getKyHTTPClient } from "./KyHTTPClient";
import { MaterialAPIClient } from "@/external-interfaces/api/MaterialAPIClient";
import { PurchaseAPIClient } from "@/external-interfaces/api/PurchaseAPIClient";
import { RecipeAPIClient } from "./RecipeAPIClient";

export function getHTTPClientInstance() {
  return getKyHTTPClient();
}

export function getMaterialAPIClient() {
  return new MaterialAPIClient(getHTTPClientInstance());
}

export function getPurchaseAPIClient() {
  return new PurchaseAPIClient(getHTTPClientInstance());
}

export function getRecipeAPIClient() {
  return new RecipeAPIClient(getHTTPClientInstance());
}
