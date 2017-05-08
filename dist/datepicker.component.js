import { Component, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Calendar } from './calendar';
import * as moment from 'moment';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
var DatepickerComponent = (function () {
    function DatepickerComponent(renderer, elementRef) {
        var _this = this;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.DEFAULT_FORMAT = 'YYYY-MM-DD';
        this.dateChange = new EventEmitter();
        this.clearText = 'Clear';
        this.placeholder = 'Select a date';
        this.cancelText = 'Cancel';
        this.weekStart = 0;
        this.onSelect = new EventEmitter();
        this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.dateFormat = this.DEFAULT_FORMAT;
        this.showCalendar = false;
        this.colors = {
            'black': '#333333',
            'blue': '#1285bf',
            'lightGrey': '#f1f1f1',
            'white': '#ffffff'
        };
        this.accentColor = this.colors['blue'];
        this.altInputStyle = false;
        this.updateDayNames();
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', ' December'
        ];
        this.clickListener = renderer.listenGlobal('document', 'click', function (event) { return _this.handleGlobalClick(event); });
        this.yearControl = new FormControl('', Validators.compose([
            Validators.required,
            Validators.maxLength(4),
            this.yearValidator,
            this.inRangeValidator.bind(this)
        ]));
    }
    Object.defineProperty(DatepickerComponent.prototype, "date", {
        get: function () {
            return this.dateVal;
        },
        set: function (val) {
            this.dateVal = val;
            this.dateChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.ngOnInit = function () {
        this.updateDayNames();
        this.syncVisualsWithDate();
    };
    DatepickerComponent.prototype.ngOnChanges = function (changes) {
        if ((changes['date'] || changes['dateFormat'])) {
            this.syncVisualsWithDate();
        }
        if (changes['firstDayOfTheWeek'] || changes['dayNames']) {
            this.updateDayNames();
        }
    };
    DatepickerComponent.prototype.ngOnDestroy = function () {
        this.clickListener();
    };
    DatepickerComponent.prototype.closeCalendar = function () {
        this.showCalendar = false;
        this.syncVisualsWithDate();
    };
    DatepickerComponent.prototype.setCurrentValues = function (date) {
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        this.yearControl.setValue(this.currentYear);
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
        this.calendarDays = this.filterInvalidDays(this.calendarDays);
    };
    DatepickerComponent.prototype.updateDayNames = function () {
        this.dayNamesOrdered = this.dayNames.slice();
        if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
            throw Error("The weekStart is not in range between " + 0 + " and " + (this.dayNamesOrdered.length - 1));
        }
        else {
            this.calendar = new Calendar(this.weekStart);
            this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
                .concat(this.dayNamesOrdered.slice(0, this.weekStart));
        }
    };
    DatepickerComponent.prototype.syncVisualsWithDate = function () {
        if (this.date) {
            this.setInputText(this.date);
            this.setCurrentValues(this.date);
        }
        else {
            this.inputText = '';
            this.setCurrentValues(new Date());
        }
    };
    DatepickerComponent.prototype.setCurrentMonth = function (monthNumber) {
        this.currentMonth = this.months[monthNumber];
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
        this.calendarDays = this.filterInvalidDays(this.calendarDays);
    };
    DatepickerComponent.prototype.setCurrentYear = function (year) {
        this.currentYear = year;
        this.yearControl.setValue(year);
    };
    DatepickerComponent.prototype.setInputText = function (date) {
        var inputText = '';
        var dateFormat = this.dateFormat;
        if (dateFormat === undefined || dateFormat === null) {
            inputText = moment(date).format(this.DEFAULT_FORMAT);
        }
        else if (typeof dateFormat === 'string') {
            inputText = moment(date).format(dateFormat);
        }
        else if (typeof dateFormat === 'function') {
            inputText = dateFormat(date);
        }
        this.inputText = inputText;
    };
    DatepickerComponent.prototype.onArrowClick = function (direction) {
        var currentMonth = this.currentMonthNumber;
        var newYear = this.currentYear;
        var newMonth;
        if (direction === 'left') {
            if (currentMonth === 0) {
                newYear = this.currentYear - 1;
                newMonth = 11;
            }
            else {
                newMonth = currentMonth - 1;
            }
        }
        else if (direction === 'right') {
            if (currentMonth === 11) {
                newYear = this.currentYear + 1;
                newMonth = 0;
            }
            else {
                newMonth = currentMonth + 1;
            }
        }
        var newDate = new Date(newYear, newMonth);
        var newDateValid;
        if (direction === 'left') {
            newDateValid = !this.rangeStart || newDate.getTime() >= this.rangeStart.getTime();
        }
        else if (direction === 'right') {
            newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
        }
        if (newDateValid) {
            this.setCurrentYear(newYear);
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.triggerAnimation(direction);
        }
    };
    DatepickerComponent.prototype.isDateValid = function (date) {
        return (!this.rangeStart || date.getTime() >= this.rangeStart.getTime()) &&
            (!this.rangeEnd || date.getTime() <= this.rangeEnd.getTime());
    };
    DatepickerComponent.prototype.filterInvalidDays = function (calendarDays) {
        var _this = this;
        var newCalendarDays = [];
        calendarDays.forEach(function (day) {
            if (day === 0 || !_this.isDateValid(day)) {
                newCalendarDays.push(0);
            }
            else {
                newCalendarDays.push(day);
            }
        });
        return newCalendarDays;
    };
    DatepickerComponent.prototype.onCancel = function () {
        this.closeCalendar();
    };
    DatepickerComponent.prototype.onClear = function () {
        this.date = null;
        this.onSelect.emit(null);
        this.closeCalendar();
    };
    DatepickerComponent.prototype.onInputClick = function () {
        this.showCalendar = !this.showCalendar;
    };
    DatepickerComponent.prototype.onSelectDay = function (day) {
        if (this.isDateValid(day)) {
            this.date = day;
            this.onSelect.emit(day);
            this.showCalendar = !this.showCalendar;
        }
    };
    DatepickerComponent.prototype.onYearSubmit = function () {
        if (this.yearControl.valid && +this.yearControl.value !== this.currentYear) {
            this.setCurrentYear(+this.yearControl.value);
            this.setCurrentMonth(this.currentMonthNumber);
        }
        else {
            this.yearControl.setValue(this.currentYear);
        }
    };
    DatepickerComponent.prototype.handleGlobalClick = function (event) {
        var withinElement = this.elementRef.nativeElement.contains(event.target);
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeCalendar();
        }
    };
    DatepickerComponent.prototype.getDayBackgroundColor = function (day) {
        var color = this.colors['white'];
        if (this.isChosenDay(day)) {
            color = this.accentColor;
        }
        else if (this.isCurrentDay(day)) {
            color = this.colors['lightGrey'];
        }
        return color;
    };
    DatepickerComponent.prototype.getDayFontColor = function (day) {
        var color = this.colors['black'];
        if (this.isChosenDay(day)) {
            color = this.colors['white'];
        }
        return color;
    };
    DatepickerComponent.prototype.isChosenDay = function (day) {
        if (day) {
            return this.date ? day.toDateString() === this.date.toDateString() : false;
        }
        else {
            return false;
        }
    };
    DatepickerComponent.prototype.isCurrentDay = function (day) {
        if (day) {
            return day.toDateString() === new Date().toDateString();
        }
        else {
            return false;
        }
    };
    DatepickerComponent.prototype.isHoveredDay = function (day) {
        return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
    };
    DatepickerComponent.prototype.triggerAnimation = function (direction) {
        var _this = this;
        this.animate = direction;
        setTimeout(function () { return _this.animate = 'reset'; }, 185);
    };
    DatepickerComponent.prototype.inRangeValidator = function (control) {
        var value = control.value;
        if (this.currentMonthNumber) {
            var tentativeDate = new Date(+value, this.currentMonthNumber);
            if (this.rangeStart && tentativeDate.getTime() < this.rangeStart.getTime()) {
                return { 'yearBeforeRangeStart': true };
            }
            if (this.rangeEnd && tentativeDate.getTime() > this.rangeEnd.getTime()) {
                return { 'yearAfterRangeEnd': true };
            }
            return null;
        }
        return { 'currentMonthMissing': true };
    };
    DatepickerComponent.prototype.yearValidator = function (control) {
        var value = control.value;
        var valid = !isNaN(value) && value >= 1970 && Math.floor(value) === +value;
        if (valid) {
            return null;
        }
        return { 'invalidYear': true };
    };
    return DatepickerComponent;
}());
export { DatepickerComponent };
DatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-datepicker',
                animations: [
                    trigger('calendarAnimation', [
                        transition('* => left', [
                            animate(180, keyframes([
                                style({ transform: 'translateX(105%)', offset: 0.5 }),
                                style({ transform: 'translateX(-130%)', offset: 0.51 }),
                                style({ transform: 'translateX(0)', offset: 1 })
                            ]))
                        ]),
                        transition('* => right', [
                            animate(180, keyframes([
                                style({ transform: 'translateX(-105%)', offset: 0.5 }),
                                style({ transform: 'translateX(130%)', offset: 0.51 }),
                                style({ transform: 'translateX(0)', offset: 1 })
                            ]))
                        ])
                    ])
                ],
                styles: [
                    ".datepicker {\n          position: relative;\n          display: inline-block;\n          color: #2b2b2b;\n          font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto';\n      }\n\n      .datepicker__calendar {\n          position: absolute;\n          overflow: hidden;\n          z-index: 1000;\n          top: 1.9em;\n          left: 0;\n          height: 23.8em;\n          width: 20.5em;\n          font-size: 14px;\n          background-color: #ffffff;\n          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n          cursor: default;\n          -webkit-touch-callout: none;\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          -ms-user-select: none;\n          user-select: none;\n      }\n\n      .datepicker__calendar__cancel {\n          position: absolute;\n          bottom: 1em;\n          left: 1.8em;\n          color: #d8d8d8;\n          cursor: pointer;\n          -webkit-transition: 0.37s;\n          transition: 0.37s;\n      }\n\n      .datepicker__calendar__cancel:hover {\n          color: #b1b1b1;\n      }\n\n      .datepicker__calendar__clear {\n          position: absolute;\n          bottom: 1em;\n          right: 1.8em;\n          color: #d8d8d8;\n          cursor: pointer;\n          -webkit-transition: 0.37s;\n          transition: 0.37s;\n      }\n\n      .datepicker__calendar__clear:hover {\n          color: #b1b1b1;\n      }\n\n      .datepicker__calendar__content {\n          margin-top: 0.4em;\n      }\n\n      .datepicker__calendar__labels {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 100%;\n      }\n\n      .datepicker__calendar__label {\n          display: inline-block;\n          width: 2.2em;\n          height: 2.2em;\n          margin: 0 0.2em;\n          line-height: 2.2em;\n          text-align: center;\n          color: #d8d8d8;\n      }\n\n      .datepicker__calendar__month {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-flow: wrap;\n          flex-flow: wrap;\n          -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n      }\n\n      .datepicker__calendar__month__day {\n          display: inline-block;\n          width: 2.2em;\n          height: 2.2em;\n          margin: 0 0.2em 0.4em;\n          border-radius: 2.2em;\n          line-height: 2.2em;\n          text-align: center;\n          -webkit-transition: 0.37s;\n          transition: 0.37s;\n      }\n\n      .datepicker__calendar__nav {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          -webkit-box-align: center;\n          -ms-flex-align: center;\n          align-items: center;\n          height: 3em;\n          background-color: #fff;\n          border-bottom: 1px solid #e8e8e8;\n      }\n\n      .datepicker__calendar__nav__arrow {\n          width: 0.8em;\n          height: 0.8em;\n          cursor: pointer;\n          -webkit-transition: 0.37s;\n          transition: 0.37s;\n      }\n\n      .datepicker__calendar__nav__arrow:hover {\n          -webkit-transform: scale(1.05);\n          transform: scale(1.05);\n      }\n\n      .datepicker__calendar__nav__chevron {\n          fill: #bbbbbb;\n          -webkit-transition: 0.37s;\n          transition: 0.37s;\n      }\n\n      .datepicker__calendar__nav__chevron:hover {\n          fill: #2b2b2b;\n      }\n\n      .datepicker__calendar__nav__header {\n          width: 11em;\n          margin: 0 1em;\n          text-align: center;\n      }\n\n      .datepicker__calendar__nav__header__form {\n          display: inline-block;\n          margin: 0;\n      }\n\n      .datepicker__calendar__nav__header__year {\n          display: inline-block;\n          width: 3em;\n          padding: 2px 4px;\n          border: 1px solid #ffffff;\n          border-radius: 2px;\n          font-size: 1em;\n          transition: 0.32s;\n      }\n\n      .datepicker__calendar__nav__header__year:focus.ng-invalid {\n          border: 1px solid #e82525;\n      }\n\n      .datepicker__calendar__nav__header__year:focus.ng-valid {\n          border: 1px solid #13ad13;\n      }\n\n      .datepicker__calendar__nav__header__year:focus {\n          outline: none;\n      }\n\n      .datepicker__input {\n          outline: none;\n          border-radius: 0.1rem;\n          padding: .2em .6em;\n          font-size: 14px;\n      }\n    "
                ],
                template: "\n    <div\n      class=\"datepicker\"\n      [ngStyle]=\"{'font-family': fontFamily}\"\n    >\n      <input\n        [disabled]=\"disabled\"\n        class=\"datepicker__input\"\n        [placeholder]=\"placeholder\"\n        [ngStyle]=\"{'color': altInputStyle ? colors['white'] : colors['black'],\n                    'background-color': altInputStyle ? accentColor : colors['white'],\n                    'border': altInputStyle ? '' : '1px solid #dadada'}\"\n        (click)=\"onInputClick()\"\n        [(ngModel)]=\"inputText\"\n        readonly=\"true\"\n      >\n      <div\n        class=\"datepicker__calendar\"\n        *ngIf=\"showCalendar\"\n      >\n        <div class=\"datepicker__calendar__nav\">\n          <div\n            class=\"datepicker__calendar__nav__arrow\"\n            (click)=\"onArrowClick('left')\"\n          >\n            <svg class=\"datepicker__calendar__nav__chevron\" x=\"0px\" y=\"0px\" viewBox=\"0 0 50 50\">\n              <g>\n                <path\n                  d=\"M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3\n                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0\n                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z\"/>\n              </g>\n              <g>\n                <path\n                  d=\"M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3\n                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7\n                    L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z\"/>\n              </g>\n            </svg>\n          </div>\n          <div class=\"datepicker__calendar__nav__header\">\n            <span>{{ currentMonth }}</span>\n            <input\n              #yearInput\n              class=\"datepicker__calendar__nav__header__year\"\n              placeholder=\"Year\"\n              [formControl]=\"yearControl\"\n              (keyup.enter)=\"yearInput.blur()\"\n              (blur)=\"onYearSubmit()\"\n            />\n          </div>\n          <div\n            class=\"datepicker__calendar__nav__arrow\"\n            (click)=\"onArrowClick('right')\"\n          >\n            <svg class=\"datepicker__calendar__nav__chevron\" x=\"0px\" y=\"0px\" viewBox=\"0 0 50 50\">\n              <g>\n                <path\n                  d=\"M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3\n                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0\n                    l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z\"/>\n              </g>\n              <g>\n                <path\n                  d=\"M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3\n                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7\n                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z\"/>\n              </g>\n            </svg>\n          </div>\n        </div>\n        <div\n          class=\"datepicker__calendar__content\"\n        >\n          <div class=\"datepicker__calendar__labels\">\n            <div\n              class=\"datepicker__calendar__label\"\n              *ngFor=\"let day of dayNamesOrdered\"\n            >\n              {{ day }}\n            </div>\n          </div>\n          <div\n            [@calendarAnimation]=\"animate\"\n            class=\"datepicker__calendar__month\"\n          >\n            <div\n              *ngFor=\"let day of calendarDays\"\n              class=\"datepicker__calendar__month__day\"\n              [ngStyle]=\"{'cursor': day == 0 ? 'initial' : 'pointer',\n                          'background-color': getDayBackgroundColor(day),\n                          'color': isHoveredDay(day) ? accentColor : getDayFontColor(day),\n                          'pointer-events': day == 0 ? 'none' : ''\n                          }\"\n              (click)=\"onSelectDay(day)\"\n              (mouseenter)=\"hoveredDay = day\"\n              (mouseleave)=\"hoveredDay = null\"\n            >\n              <span *ngIf=\"day != 0\">\n                {{ day.getDate() }}\n              </span>\n            </div>\n          </div>\n          <div\n            class=\"datepicker__calendar__cancel\"\n            (click)=\"onCancel()\"\n          >\n            {{cancelText}}\n          </div>\n          <div\n            *ngIf=\"canBeCleared\"\n            class=\"datepicker__calendar__clear\"\n            (click)=\"onClear()\"\n          >\n            {{clearText}}\n          </div>\n        </div>\n      </div>\n    </div>\n  "
            },] },
];
DatepickerComponent.ctorParameters = function () { return [
    { type: Renderer, },
    { type: ElementRef, },
]; };
DatepickerComponent.propDecorators = {
    'dateChange': [{ type: Output },],
    'date': [{ type: Input },],
    'disabled': [{ type: Input },],
    'accentColor': [{ type: Input },],
    'altInputStyle': [{ type: Input },],
    'dateFormat': [{ type: Input },],
    'fontFamily': [{ type: Input },],
    'rangeStart': [{ type: Input },],
    'rangeEnd': [{ type: Input },],
    'canBeCleared': [{ type: Input },],
    'clearText': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'inputText': [{ type: Input },],
    'showCalendar': [{ type: Input },],
    'cancelText': [{ type: Input },],
    'weekStart': [{ type: Input },],
    'onSelect': [{ type: Output },],
    'calendarDays': [{ type: Input },],
    'currentMonth': [{ type: Input },],
    'dayNames': [{ type: Input },],
    'hoveredDay': [{ type: Input },],
    'months': [{ type: Input },],
};
//# sourceMappingURL=datepicker.component.js.map