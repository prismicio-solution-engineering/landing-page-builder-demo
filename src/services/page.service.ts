import { Query } from "@prismicio/client";
import { AllDocumentTypes } from "@/prismicio-types";

import { ApiService } from "./api.service";
export class PageService {
  apiService: ApiService;

  constructor(private readonly lang: string) {
    this.apiService = ApiService.getInstance();
    this.lang = lang;
  }

  async getSinglePage({
    documentType,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    options?: {
      graphQuery?: string;
      limit?: number;
    };
  }): Promise<AllDocumentTypes> {
    return await this.apiService.getSinglePage({
      documentType,
      lang: this.lang,
      options
    });
  }

  async getPageByUID({
    documentType,
    uid,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    uid: string;
    options?: {
      graphQuery?: string;
      limit?: number;
    };
  }): Promise<AllDocumentTypes> {
    return await this.apiService.getPageByUID({
      documentType,
      uid,
      lang: this.lang,
      options
    });
  }

  async getAllPageByTypes({
    documentType,
    lang = this.lang,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    lang?: string;
    options?: {
      graphQuery?: string;
      limit?: number;
    };
  }): Promise<AllDocumentTypes[]> {
    return await this.apiService.getAllDocumentTypes({
      documentType,
      lang,
      options
    });
  }

  async getByType({
    documentType,
    lang = this.lang,
    options
  }: {
    documentType: AllDocumentTypes["type"];
    lang?: string;
    limit?: number;
    options: {
      orderings?: {
        field: string;
        direction: "asc" | "desc" | undefined;
      };
      filters?: string[];
      pageSize: number;
      page: number;
    };
  }): Promise<Query<AllDocumentTypes>> {
    return this.apiService.getByType({
      documentType: documentType,
      lang: lang,
      options: options
    });
  }
}
