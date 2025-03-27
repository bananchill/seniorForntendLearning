import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';

/** 
 * @typedef {Object} RangeDate
 * @property {Date} date
 * @property {number} value
*/


const FORMAT_DATE = 'dd.MM.yyyy';

/** 
 * @param {RangeDate[]} rangeDate
 * @param {string} beginDate
 * @param {string} endDate
 * @returns {RangeDate[]}
*/
export default function buildRange(rangeDate, beginDate, endDate) {
  const dates = [];

  const rangeDates = eachDayOfInterval({
    start: new Date(beginDate),
    end: new Date(endDate),
  });
  
  const rangeDateMap = rangeDate.reduce((acc, item) => {
    acc[item.date] = item;
    return acc;
  }, {});

  rangeDates.forEach((date) => {
    const formattedDate = format(date, FORMAT_DATE);
    const value = rangeDateMap[formattedDate]?.value || 0;
    dates.push({
      date: formattedDate,
      value,
    });
  });

  return dates;
}

const dates = [
  { value: 14, date: '02.08.2018' },
  { value: 43, date: '03.08.2018' },
];
const beginDate = '2018-08-01';
const endDate = '2018-08-04';

console.log(buildRange(dates, beginDate, endDate));
