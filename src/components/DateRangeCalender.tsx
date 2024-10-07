'use client';
import { Range, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRangeCalender({
    dateRange,
    setDateRange,
}: {
    dateRange: Range[];
    setDateRange: (range: Range[]) => void;
}) {
    return (
        <DateRangePicker
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
        />
    );
}
