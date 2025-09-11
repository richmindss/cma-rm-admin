import { Injectable } from "@angular/core";
import { BackendService } from "../backend/backend.service";

@Injectable({
  providedIn: "root"
})
export class TemplateConfigurationService {
  private path = "/template-configuration";

  constructor(private backendService: BackendService) {}

  saveTemplateConfiguration(type: any, content: any) {
    return this.backendService.post(this.path, { text: content, type: type });
  }

  getTemplateConfigByType(type: any) {
    return this.backendService.get(this.path + "/" + type);
  }

  
}
