import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export * from './datepicker.component';
var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    return DatepickerModule;
}());
export { DatepickerModule };
DatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DatepickerComponent],
                exports: [DatepickerComponent],
                imports: [CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule]
            },] },
];
DatepickerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datepicker.module.js.map