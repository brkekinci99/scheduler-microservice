export const findNextDay: Function = (date: Date, days: Array<Number>, weeks: number) => {
  let dayFound: boolean = false;
  let nextDay: number;
  const currentDate = new Date(date);

  // get day of week
  let currentDay = currentDate.getDay();

  if (currentDay == 7) {
    currentDay = 0;
  }

  for (let i = currentDay + 1; i < 8; i++) {
    if (days.includes(i)) {
      dayFound = true;
      nextDay = i;
      break;
    }
  }

  if (!dayFound) {
    for (let j = 1; j < 8; j++) {
      if (days.includes(j)) {
        nextDay = j;
        break;
      }
    }

    const addingDays: number = 7 - (currentDay - nextDay);
    const nextDate = currentDate;

    nextDate.setDate(nextDate.getDate() + addingDays + (weeks - 1) * 7);

    return nextDate;
  }
  const addingDays = nextDay - currentDay;
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + addingDays);
  return nextDate;
};
