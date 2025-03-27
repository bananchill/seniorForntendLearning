import buildRange from './solution/range-date.js';

describe('buildRange', () => {
    test('In range', () => {
        const dates = [
          { value: 14, date: '02.08.2018' },
          { value: 38, date: '05.08.2018' },
          { value: 43, date: '03.08.2018' },
        ];
        const beginDate = '2018-08-01';
        const endDate = '2018-08-10';
        const expected = [
          { value: 0, date: '01.08.2018' },
          { value: 14, date: '02.08.2018' },
          { value: 43, date: '03.08.2018' },
          { value: 0, date: '04.08.2018' },
          { value: 38, date: '05.08.2018' },
          { value: 0, date: '06.08.2018' },
          { value: 0, date: '07.08.2018' },
          { value: 0, date: '08.08.2018' },
          { value: 0, date: '09.08.2018' },
          { value: 0, date: '10.08.2018' },
        ];
      
        const actual = buildRange(dates, beginDate, endDate);
        expect(actual).toEqual(expected);
      });
      
      test('Without data', () => {
        const dates = [];
        const beginDate = '2018-08-02';
        const endDate = '2018-08-04';
        const expected = [
          { value: 0, date: '02.08.2018' },
          { value: 0, date: '03.08.2018' },
          { value: 0, date: '04.08.2018' },
        ];
      
        const actual = buildRange(dates, beginDate, endDate);
        expect(actual).toEqual(expected);
      });
      
      test('Month range', () => {
        const dates = [
          { value: 100, date: '27.02.2019' },
          { value: 0, date: '02.03.2019' },
        ];
        const beginDate = '2019-02-27';
        const endDate = '2019-03-02';
        const expected = [
          { value: 100, date: '27.02.2019' },
          { value: 0, date: '28.02.2019' },
          { value: 0, date: '01.03.2019' },
          { value: 0, date: '02.03.2019' },
        ];
      
        const actual = buildRange(dates, beginDate, endDate);
        expect(actual).toEqual(expected);
      });
})
