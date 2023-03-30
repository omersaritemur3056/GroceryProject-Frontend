import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  message(message: string, messageType: MessageType = MessageType.Message, position: Position = Position.BottomRight, 
    delay: number = 3, dismissOthers: boolean = false) {
    alertify.set('notifier', 'delay', delay);
    alertify.set('notifier', 'position', position);
    const messageParam = alertify[messageType](message);
    if (dismissOthers) { messageParam.dismissOthers(); }
  }

  alert(alertTitle: string, alertMessage: string, func?: Function){
    alertify.alert(alertTitle, alertMessage, func);
  }

  confirm(confirmTitle:string, confirmMessage: string, okFunction: any, cancelFunction: any){
    alertify.confirm(confirmTitle, confirmMessage, okFunction, cancelFunction);
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}