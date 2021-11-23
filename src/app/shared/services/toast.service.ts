import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly toastr: ToastrService) {}

  showSuccessMessage(message: string) {
    this.toastr.success(message);
  }

  showErrorMessage(error: string) {
    this.toastr.error(error);
  }
}
