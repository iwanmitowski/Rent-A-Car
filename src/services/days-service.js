export function daysDiff (startDate, endDate) {
    const startDateValue = new Date(startDate);
    const endDateValue = new Date(endDate);
    const diffTime = Math.abs(endDateValue - startDateValue);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1;
}

export function areValidDates (startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);

    return start <= end;
}