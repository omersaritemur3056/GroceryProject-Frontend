import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from 'src/app/services/customize-services/alertify.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  
  constructor(private photoService: PhotoService, private alertify: AlertifyService, private http: HttpClient){}
  
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>
  
  public selectedFiles(files: NgxFileDropEntry[]){
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

      console.log(file.relativePath, file, fileData);
    }

    this.http.post('http://localhost:8080/api/image/add', fileData, {responseType:"blob"}).subscribe(data => {
      this.alertify.message("Dosya yüklendi!", MessageType.Success, Position.TopCenter);
    }, ()=>{
         this.alertify.message("Dosya yüklenemedi!", MessageType.Error, Position.TopCenter);
       })
    
    // this.photoService.upload(fileData).subscribe(data => {
    //   this.alertify.message(data.message, MessageType.Success, Position.TopCenter);
    // }, ()=>{
    //   this.alertify.message("Dosya yüklenemedi!", MessageType.Error, Position.TopCenter);
    // })
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}