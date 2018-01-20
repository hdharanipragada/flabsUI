import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppService } from './app-service.service';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { UploadComponent } from './upload/upload.component';

import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
