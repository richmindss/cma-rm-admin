import { Injectable } from "@angular/core";
import { BackendService } from "../backend/backend.service";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  private path = "/languages";

  constructor(private backendService: BackendService) {}

  saveLanguage(languagecode: string, languagename: string, id: string) {
    return this.backendService.post(this.path + "/save", {
      code: languagecode,
      name: languagename,
      _id: id
    });
  }

  getLanguage() {
    return this.backendService.get(this.path);
  }

  deleteLanguage(langId) {
    return this.backendService.get(this.path + '/'+ langId +"/delete");
  }

  saveLangPreference(opt) {
    return this.backendService.post(this.path + "/portal/preference", {
      language: opt
    });
  }

  getLangPreference() {
    return this.backendService.get(this.path + "/portal/preference");
  }

  getPortalLanguages() {
    return this.backendService.get(this.path + "/portal");
  }

  addPortalLanguage(langCode: any) {
    return this.backendService.post(this.path + "/portal", {
      language: langCode
    });
  }

  deletePortalLanguage(langCode: string) {
    return this.backendService.post(this.path + "/portal/remove", {
      language: langCode
    });
  }
}
