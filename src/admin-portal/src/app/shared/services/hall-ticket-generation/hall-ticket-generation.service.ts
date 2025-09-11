import { Injectable } from "@angular/core";
import { BackendService } from "../backend/backend.service";

@Injectable({
  providedIn: "root"
})
export class HallTicketGenerationService {
  private path = "/hall-tickets";

  constructor(private backendService: BackendService) {}

  saveHallTicket(data) {
    return this.backendService.post(this.path, data);
  };

  getHallTicket() {
    return this.backendService.get(this.path);
  };
}
