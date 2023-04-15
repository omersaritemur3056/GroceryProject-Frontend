import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
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
export class ProducerComponent extends BaseComponent implements OnInit {

  producers: GetAllProducerResponse[] = [];
  sortedProducers: GetAllProducerResponse[] = [];
  enablePageButton: boolean = false;
  filterText = "";
  pageNo: number;
  pageSize: number = 5;
  sortBy: string = "name";

  constructor(private producerService: ProducerService, private toastrService: ToastrService,
    private alertify: AlertifyService, spinner: NgxSpinnerService, private activatedRoute: ActivatedRoute,
    authService: AuthService) {
    super(spinner, authService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Spin);
    this.activatedRoute.params.subscribe(params => {
      if (params["pageNo"]) {
        this.getPageFromProducerList()
        this.getProducersByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else {
        this.getPageFromProducerList()
        this.getProducersByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getProducers() {
    this.producerService.getProducers().subscribe(response => {
      this.producers = response.data;
      this.hideSpinner(SpinnerType.Spin);
    })
  }

  async getPageFromProducerList() {
    this.producerService.getProducersBySortingNameAsc(this.sortBy).subscribe(p => {
      this.sortedProducers = p.data
      this.hideSpinner(SpinnerType.Spin);
    });
    return this.sortedProducers;
  }

  getProducersByPaginationAndSortingNameAsc(page: number) {
    let x = Math.ceil(page)
    this.producerService.getProducersByPaginationAndSortingNameAsc(x - 1, this.pageSize, this.sortBy)
      .subscribe(response => {
        this.producers = response.data;
        this.hideSpinner(SpinnerType.Spin);
        this.enablePageButton = true;
      })
  }

  deleteProducer(deleteProducerId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteProducer: DeleteProducerRequest = { id: deleteProducerId }
      this.producerService.delete(deleteProducer).subscribe(response => {
        this.toastrService.error(response.message, deleteProducer.id.toString());
      })
    }, () => {
      return;
    })
  }
}
