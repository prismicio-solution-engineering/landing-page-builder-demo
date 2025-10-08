import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { AllDocumentTypes } from "@/prismicio-types";

export class ApiService {
  static instance: ApiService;
  public client: prismic.Client<AllDocumentTypes>;

  constructor(client: prismic.Client<AllDocumentTypes>) {
    this.client = client;
  }

  static getInstance(config: prismic.ClientConfig = {}) {
    if (!this.instance || config) {
      const c = createClient(config);
      this.instance = new ApiService(c);
    }
    return this.instance;
  }

  static setPreviewData(config: prismic.ClientConfig) {
    const c = createClient(config);
    this.instance = new ApiService(c);
  }

  async getSinglePage({
    documentType,
    lang,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    lang: string;
    options?: object;
  }): Promise<AllDocumentTypes> {
    return this.client.getSingle(documentType, { lang, ...options });
  }

  async getPageByUID({
    documentType,
    uid,
    lang,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    uid: string;
    lang: string;
    options?: object;
  }): Promise<AllDocumentTypes> {
    return this.client.getByUID(documentType, uid, { lang, ...options });
  }

  async getAllDocumentTypes({
    documentType,
    lang,
    limit,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    lang: string;
    limit?: number;
    options?: object;
  }): Promise<AllDocumentTypes[]> {
    return this.client.getAllByType(documentType, {
      lang,
      limit,
      ...options
    });
  }

  async getByType({
    documentType,
    lang,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    lang: string;
    limit?: number;
    options: {
      orderings?: {
        field: string;
        direction: "asc" | "desc" | undefined;
      };
      pageSize: number;
      page: number;
    };
  }): Promise<prismic.Query<AllDocumentTypes>> {
    return this.client.getByType(documentType, {
      lang,
      ...options
    });
  }
}
