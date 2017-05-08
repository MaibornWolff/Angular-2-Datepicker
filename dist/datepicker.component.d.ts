import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Calendar } from './calendar';
export interface DateFormatFunction {
    (date: Date): string;
}
export interface ValidationResult {
    [key: string]: boolean;
}
export declare class DatepickerComponent implements OnInit, OnChanges {
    private renderer;
    private elementRef;
    private readonly DEFAULT_FORMAT;
    private dateVal;
    dateChange: EventEmitter<Date>;
    date: Date;
    disabled: boolean;
    accentColor: string;
    altInputStyle: boolean;
    dateFormat: string | DateFormatFunction;
    fontFamily: string;
    rangeStart: Date;
    rangeEnd: Date;
    canBeCleared: boolean;
    clearText: string;
    placeholder: string;
    inputText: string;
    showCalendar: boolean;
    cancelText: string;
    weekStart: number;
    onSelect: EventEmitter<Date>;
    calendarDays: Array<number>;
    currentMonth: string;
    dayNames: Array<String>;
    hoveredDay: Date;
    months: Array<string>;
    dayNamesOrdered: Array<String>;
    calendar: Calendar;
    currentMonthNumber: number;
    currentYear: number;
    animate: string;
    colors: {
        [id: string]: string;
    };
    clickListener: Function;
    yearControl: FormControl;
    constructor(renderer: Renderer, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    closeCalendar(): void;
    private setCurrentValues(date);
    private updateDayNames();
    syncVisualsWithDate(): void;
    setCurrentMonth(monthNumber: number): void;
    setCurrentYear(year: number): void;
    setInputText(date: Date): void;
    onArrowClick(direction: string): void;
    isDateValid(date: Date): boolean;
    filterInvalidDays(calendarDays: Array<number>): Array<number>;
    onCancel(): void;
    onClear(): void;
    onInputClick(): void;
    onSelectDay(day: Date): void;
    onYearSubmit(): void;
    handleGlobalClick(event: MouseEvent): void;
    getDayBackgroundColor(day: Date): string;
    getDayFontColor(day: Date): string;
    isChosenDay(day: Date): boolean;
    isCurrentDay(day: Date): boolean;
    isHoveredDay(day: Date): boolean;
    triggerAnimation(direction: string): void;
    inRangeValidator(control: FormControl): ValidationResult;
    yearValidator(control: FormControl): ValidationResult;
}
