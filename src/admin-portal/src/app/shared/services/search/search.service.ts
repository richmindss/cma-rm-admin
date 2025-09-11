import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { ExamListService } from '../exam-list/exam-list.service';
import { CandidateListService } from '../candidate-list/candidate-list.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {


    private path = '/search';


    constructor(
        private backendService: BackendService,
       
        private examDashboardService: ExamListService,
        private candidateListService: CandidateListService,


    ) { }

    search(entity, term, meta) {


      
       


    }













    }


