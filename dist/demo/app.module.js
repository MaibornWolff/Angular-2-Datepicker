"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var datepicker_module_1 = require("../datepicker.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    animations_1.BrowserAnimationsModule,
                    datepicker_module_1.DatepickerModule,
                    forms_1.FormsModule,
                ],
                declarations: [app_component_1.AppComponent],
                bootstrap: [app_component_1.AppComponent]
            },] },
];
AppModule.ctorParameters = function () { return []; };
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map