import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteProducerRequest } from 'src/app/models/producer/delete-producer-request';
import { GetAllProducerResponse } from 'src/app/models/producer/get-all-producer-response';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent {

  producers: GetAllProducerResponse[] = [];
  filterText = "";

  constructor(private producerService:ProducerService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getProducers();
  }

  getProducers(){
    this.producerService.getProducers().subscribe(response => {
      this.producers = response.data;
    })
  }

  deleteProducer(deleteProducerId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteProducer: DeleteProducerRequest = { id: deleteProducerId }
       this.producerService.delete(deleteProducer).subscribe(response => {
        this.toastrService.error(response.message, deleteProducer.id.toString());
      })
    }, () => {
      return;
    })
  }

  isAdmin(){
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator(){
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }

  isEditor(){
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
