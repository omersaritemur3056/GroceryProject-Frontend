import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteProducerRequest } from 'src/app/models/producer/delete-producer-request';
import { GetAllProducerResponse } from 'src/app/models/producer/get-all-producer-response';
import { ProducerService } from 'src/app/services/producer.service';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent {

  producers: GetAllProducerResponse[] = [];

  constructor(private producerService:ProducerService, private toastrService:ToastrService){}

  ngOnInit(): void {
    this.getProducers();
  }

  getProducers(){
    this.producerService.getProducers().subscribe(response => {
      this.producers = response.data;
    })
  }

  deleteProducer(deleteProducerId:number){
    if(!window.confirm("Silmek istediğinize emin misiniz?")){return;}
    let deleteProducer:DeleteProducerRequest = {id:deleteProducerId}
    this.producerService.delete(deleteProducer).subscribe(response => {
      this.toastrService.error(response.message, deleteProducer.id.toString());
    })
  }
}
