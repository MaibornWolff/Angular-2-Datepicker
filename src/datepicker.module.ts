import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DatepickerComponent } from './datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export * from './datepicker.component';

@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule ]
})
export class DatepickerModule { }
