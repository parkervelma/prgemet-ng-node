import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketComponent } from './market/market.component';
import { RFSAddComponent } from './rfs-add/rfs-add.component';
const routes: Routes = [
  {
    path: 'market',
    component: MarketComponent
  },
  {
    path: 'addRFS',
    component: RFSAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
