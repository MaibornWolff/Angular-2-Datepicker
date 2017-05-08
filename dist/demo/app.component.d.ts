export declare class AppComponent {
    date: Date;
    disabled: boolean;
    testRangeDate: Date;
    constructor();
    formatDate(date: Date): string;
    onSelect(date: Date): void;
    clearDate(): void;
    setToday(): void;
}
