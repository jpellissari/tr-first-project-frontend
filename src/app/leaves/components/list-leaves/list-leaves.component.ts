import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ListComponent } from 'src/app/shared/components/list-component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ApiSimplifiedLeave } from '../../models/api-simplified-leave';
import { LeavesService } from '../../services/leaves.service';

@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.scss']
})
export class ListLeavesComponent extends ListComponent<ApiSimplifiedLeave> {
  constructor(
    toastService: ToastService,
    titleService: Title,
    leavesService: LeavesService,
    translateService: TranslateService,
    loadingService: LoadingService
  ) {
    super(
      toastService,
      loadingService,
      leavesService,
      translateService,
      titleService,
      'leaves'
    );
  }
}
