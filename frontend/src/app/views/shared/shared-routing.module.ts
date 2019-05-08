import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UploadDummyComponent } from './upload-dummy/upload-dummy.component';
import { SliderManagementComponent } from './slider-management/slider-management.component';
const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'uploadDummy',
    component: UploadDummyComponent
  },
  {
    path: 'sliderManagement',
    component: SliderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
