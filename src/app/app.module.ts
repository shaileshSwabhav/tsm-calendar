import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './component/month/month.component';
import { WeekComponent } from './component/week/week.component';
import { ChunkPipe } from './pipe/chunk.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    WeekComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
