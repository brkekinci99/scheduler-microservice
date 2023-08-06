"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNextDay = void 0;
const findNextDay = (date, days, weeks) => {
    let dayFound = false;
    let nextDay;
    const currentDate = new Date(date);
    // get day of week
    let currentDay = currentDate.getDay();
    for (let i = currentDay + 1; i < 8; i++) {
        if (days.includes(i)) {
            dayFound = true;
            nextDay = i;
            break;
        }
    }
    console.log(dayFound);
    if (!dayFound) {
        for (let j = 1; j < 8; j++) {
            console.log(j);
            if (days.includes(j)) {
                nextDay = j;
                break;
            }
        }
        const addingDays = 7 - (currentDay - nextDay);
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + addingDays + (weeks - 1) * 7);
        return nextDate;
    }
    const addingDays = nextDay - currentDay;
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + addingDays);
    return nextDate;
};
exports.findNextDay = findNextDay;
//# sourceMappingURL=findNextDay.js.map