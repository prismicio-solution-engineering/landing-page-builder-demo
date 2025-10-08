import { AllDocumentTypes } from "@/prismicio-types";
import { ApiService } from "./api.service";

export class CustomService {
  apiService: ApiService;

  constructor(private readonly lang: string) {
    this.apiService = ApiService.getInstance();
    this.lang = lang;
  }

  async getFooter(): Promise<AllDocumentTypes> {
    return await this.apiService.getSinglePage({
      documentType: "footer",
      lang: this.lang
    });
  }

  async getHeader(): Promise<AllDocumentTypes> {
    return await this.apiService.getSinglePage({
      documentType: "header",
      lang: this.lang
    });
  }

  async getPageFromAltLang(
    documentType: AllDocumentTypes["type"],
    uid: string,
    lang: string
  ): Promise<AllDocumentTypes> {
    return this.apiService.getPageByUID({
      documentType,
      uid,
      lang,
      options: {
        graphQuery: `
          {
            ${documentType} {
              meta_title
            }
          }
        `
      }
    });
  }
}
