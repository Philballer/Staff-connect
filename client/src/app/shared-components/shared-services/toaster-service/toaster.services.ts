import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface IToastOptions {
  positionClass: string;
  closeButton?: boolean;
  easing?: string;
  easeTIme?: string | number;
  tapToDismiss?: boolean;
  timeOut?: number;
  progressBar?: boolean;
}

@Injectable()
export class ToasterService {
  private toastrProperties: IToastOptions = {
    positionClass: 'toast-bottom-left',
    timeOut: 3500,
    progressBar: true,
  };

  constructor(private toastr: ToastrService) {}

  toast(type: string, message: string, heading?: string): void {
    switch (type) {
      case 'success':
        this.toastr.success(message, heading, this.toastrProperties);
        break;
      case 'info':
        this.toastr.info(message, heading, this.toastrProperties);
        break;
      case 'error':
        this.toastr.error(message, heading, this.toastrProperties);
        break;
      case 'warning':
        this.toastr.warning(message, heading, this.toastrProperties);
    }
  }
}
