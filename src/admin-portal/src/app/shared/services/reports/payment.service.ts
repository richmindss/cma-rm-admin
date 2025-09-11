import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    private path = '/reports';

    constructor(private backendService: BackendService) { }


    getPaymentStatus() {
        return this.backendService.get(this.path + '/payment/status');
    }

}
