import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
//import { TestContextService } from "../../../shared/services/test-context/test-context.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
//import { QuestionBankService } from "src/app/shared";
import { first } from "rxjs/operators";
import { QbUploadService } from "src/app/shared/services";
import { BackendService } from "src/app/shared/services/backend/backend.service";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: "app-all-questions",
  templateUrl: "./all-questions.component.html",
  styleUrls: ["./all-questions.component.scss"]
})
export class AllQuestionsComponent implements OnInit {
  @Input() content:any;  
  @Output() onContentChanged = new EventEmitter<any> ();
  tinyId = "contentTinymce"; 
  questionUpdate:any;
  type:any;
  questionData:any;
  data:any;
  alt1:string;
  alt2:string;
  alt3:string;
  alt4:string;
  constructor(private activeModal: NgbActiveModal,
    private questionBankService: QbUploadService,
    private backendService:BackendService,
    private sanitizer: DomSanitizer,
    //private questionBankService: QuestionBankService,
    // private testContextApi: TestContextService
    ) { }

  ngOnInit() {
   
  }

  close() {
    this.activeModal.close();
     window.location.reload();
  }

  getAllQuestionById(question:any) {
  
    this.questionUpdate = question;
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt1 = this.questionUpdate.alternative1.toString();
    }

    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt2 = this.questionUpdate.alternative2.toString();
    }
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt3 = this.questionUpdate.alternative3.toString();
    }
    if(this.questionUpdate && this.questionUpdate.alternative1){
      this.alt4 = this.questionUpdate.alternative4.toString();
    }
  }

  openForQuestion(e:any,type:any){
    this.questionData = e;
    this.type = type;
    console.log("questionData..................",this.questionData,"this.type.............",this.type);
  }

  onFileSelected(event: any,obj:any,doc_type:any) {
    const file: File = event.target.files[0];
    const image_type = file.type;
    if (!file) {
      alert("Please select a file!");
      return;
    }

    // ✅ 1. Check file type (only PNG)
    const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
    if (!isPng) {
      alert("❌ Only PNG files are allowed!");
      event.target.value = ''; // Reset file input
      return;
    }

    // ✅ 2. Check file size (must be around 30 KB)
    const fileSizeKB = file.size / 1024; // convert bytes → KB

    // You can allow a small tolerance (±1 KB)
    const targetSize = 20;
    
    if (fileSizeKB > targetSize) {
      alert("⚠️ File size must be approximately 30 KB!");
      event.target.value = ''; // Reset input
      return;
    }

    // ✅ 3. File is valid
    console.log("✅ File accepted:", file.name, "Size:", fileSizeKB.toFixed(2), "KB");
    const formData = new FormData();
    formData.append("file", file);
    //this.uploadFile(file); // Call your upload logic

    const reader = new FileReader();
    let picture;

    reader.readAsDataURL(file);

    reader.onload = async () => {
      picture = reader.result as string;
      const payload = {
        b_64: picture,
        image_type,
        doc_type:doc_type,
        filename: file.name,
        id:obj?._id
      };

       try{
       this.backendService.post ('/uploadQb/uploadImg' ,payload).subscribe(resp => {
        if(resp){
          if(resp && resp["status"]){
            alert( resp["message"]);
            this.activeModal.close();
            window.location.reload();
          }else{
            alert( resp["message"]);
          }
        }
      })
      }catch(e){
        // if(e && e.status == 401){
        //   this.auth.logout();
        // }
      }
    };

    reader.onerror = (err) => {
      alert(err);
    };

   
 }



  updateQuestionBank(){
   
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
          alert("question updated successfully");
      }
    });
  }

  updateAlternative1(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative1 updated successfully");
      }
    });
  }

  updateAlternative2(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative2 updated successfully");
      }
    });
  }

  updateAlternative3(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative3 updated successfully");
      }
    });
  }

  updateAlternative4(){
    this.questionBankService
    .updateQuestionBank(this.questionUpdate._id,this.type,this.questionData)
    .pipe(first())
    .subscribe(res => {
      if(res && res["status"]){
        alert("alternative4 updated successfully");
      }
    });
  }
}
