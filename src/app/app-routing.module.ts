import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddPartComponent} from "./parts/add-part/add-part.component";

const routes: Routes = [
  {path: 'list-parts', redirectTo: '/', pathMatch: 'full'},
  {path: 'add-part', component: AddPartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}