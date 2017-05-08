"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.testRangeDate = new Date();
    }
    AppComponent.prototype.formatDate = function (date) {
        return date.toLocaleString();
    };
    AppComponent.prototype.onSelect = function (date) {
        console.log("onSelect: ", date);
    };
    AppComponent.prototype.clearDate = function () {
        this.date = null;
    };
    AppComponent.prototype.setToday = function () {
        this.date = new Date();
    };
    return AppComponent;
}());
AppComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'my-app',
                template: "\n      <material-datepicker\n        [(date)]=\"date\"\n        (onSelect)=\"onSelect($event)\"\n        dateFormat=\"YYYY-MM-DD\"\n        [rangeEnd]=\"testRangeDate\"\n        [canBeCleared]=\"true\"\n      ></material-datepicker>\n\n      <button (click)=\"setToday()\">today</button>\n      <button (click)=\"clearDate()\">reset</button>\n      <hr>\n      {{ date }}\n      <p>\n      Mirror(disabled, DD-MM-YYYY):\n      <material-datepicker\n        placeholder=\"nothing is selected\"\n        disabled=\"true\"\n        [(date)]=\"date\"\n        [dateFormat]=\"formatDate\"\n      ></material-datepicker>\n\n    "
            },] },
];
AppComponent.ctorParameters = function () { return []; };
AppComponent.propDecorators = {
    'testRangeDate': [{ type: core_1.Input },],
};
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map