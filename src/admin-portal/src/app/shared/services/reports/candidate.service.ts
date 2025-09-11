import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    private path = '/reports';

    constructor(private backendService: BackendService) { }


    getApplicationStatus() {
        return this.backendService.get(this.path + '/status');
    }

}
