import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarketRoutingModule } from './market-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { StarRatingModule } from 'angular-star-rating';
import { TextMaskModule } from 'angular2-text-mask';

import { MarketComponent } from './market/market.component';
import { RFSAddComponent } from './rfs-add/rfs-add.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    MarketRoutingModule,
    HttpClientModule,
    FileUploadModule,
    MultiselectDropdownModule,
    SharedPipesModule,
    TextMaskModule,
    NgImageSliderModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [MarketComponent, RFSAddComponent]
})
export class MarketModule { }
