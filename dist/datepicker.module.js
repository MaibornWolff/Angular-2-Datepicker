"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var datepicker_component_1 = require("./datepicker.component");
var animations_1 = require("@angular/platform-browser/animations");
__export(require("./datepicker.component"));
var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    return DatepickerModule;
}());
DatepickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [datepicker_component_1.DatepickerComponent],
                exports: [datepicker_component_1.DatepickerComponent],
                imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, animations_1.BrowserAnimationsModule]
            },] },
];
DatepickerModule.ctorParameters = function () { return []; };
exports.DatepickerModule = DatepickerModule;
//# sourceMappingURL=datepicker.module.js.map