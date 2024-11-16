import dayjs from 'dayjs';

export const use24HrTime = () => {
  const convert24HrTime = (d: string) => {
    if (!d) return '';
    return +d.split(':')[0] + 12 + ':' + d.split(':')[1];
  };

  const convertMiddayTime = (date: string) => {
    if (+date.split(':')[0] > 2) {
      return date;
    }
    return convert24HrTime(date);
  };

  const convertFromUtcTime = (date: string) => {
    return dayjs(date).format('H:mm:ss');
  };

  return { convert24HrTime, convertMiddayTime, convertFromUtcTime };
};
