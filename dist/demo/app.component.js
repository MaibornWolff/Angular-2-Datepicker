import { Component, Input } from '@angular/core';
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
export { AppComponent };
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'my-app',
                template: "\n      <material-datepicker\n        [(date)]=\"date\"\n        (onSelect)=\"onSelect($event)\"\n        dateFormat=\"YYYY-MM-DD\"\n        [rangeEnd]=\"testRangeDate\"\n        [canBeCleared]=\"true\"\n      ></material-datepicker>\n\n      <button (click)=\"setToday()\">today</button>\n      <button (click)=\"clearDate()\">reset</button>\n      <hr>\n      {{ date }}\n      <p>\n      Mirror(disabled, DD-MM-YYYY):\n      <material-datepicker\n        placeholder=\"nothing is selected\"\n        disabled=\"true\"\n        [(date)]=\"date\"\n        [dateFormat]=\"formatDate\"\n      ></material-datepicker>\n\n    "
            },] },
];
AppComponent.ctorParameters = function () { return []; };
AppComponent.propDecorators = {
    'testRangeDate': [{ type: Input },],
};
//# sourceMappingURL=app.component.js.map