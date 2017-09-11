import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DatepickerModule } from '../datepicker.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    DatepickerModule,
    FormsModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
