import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { GraphComponent } from './graph/graph.component';


const routes: Routes = [
  {path: 'upload', component: UploadComponent},
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'graph/:id', component: GraphComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
