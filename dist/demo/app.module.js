import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatepickerModule } from '../datepicker.module';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
export { AppModule };
AppModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    DatepickerModule,
                    FormsModule,
                ],
                declarations: [AppComponent],
                bootstrap: [AppComponent]
            },] },
];
AppModule.ctorParameters = function () { return []; };
//# sourceMappingURL=app.module.js.map