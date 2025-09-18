import { ManagementAPI, StorefrontAPI } from "@ywwa/paylater";

export class PaynowAPI {
  public management = new ManagementAPI();
  public products = new StorefrontAPI();

  constructor({ apiKey }: { apiKey?: string }) {
    if (apiKey) {
      this.management.setToken(apiKey);
    }
  }
}
