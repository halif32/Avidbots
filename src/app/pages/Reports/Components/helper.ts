import { useProfileContext } from 'contexts/ProfileContext';
import moment from 'moment';
import { convertTime, litersToGallons, squareFeetToSquareMeters } from 'utils/conversionFunctions';

export const getIconAndValue = (data: any, type: any) => {
  const { profileInfo } = useProfileContext();
  if (data) {
    if (type === 'time') {
      return convertTime(data);
    } else if (type === 'area') {
      if (profileInfo.area_unit == 'square feet') {
        return data + ' ft²';
      } else {
        return Math.round(squareFeetToSquareMeters(data)) + ' m²';
      }
    } else if (type === 'performace') {
      if (profileInfo.area_unit == 'square feet') {
        return data + ' ft²/hr';
      } else {
        return squareFeetToSquareMeters(data) + ' m²/hr';
      }
    } else {
      return (
        litersToGallons(data, profileInfo.volume_unit) +
        ' ' +
        profileInfo.volume_unit?.replace('us', 'US').replace('litres', 'Litres')
      );
    }
  }
};

export const getTotalTime = (start_time: string, end_time: string, unskippedtime: string) => {
  const totalTime = moment.duration(moment(end_time).diff(moment(start_time)));
  const totalSeconds = totalTime.hours() * 3600 + totalTime.minutes() * 60 + totalTime.seconds();
  const unskippedTimeSecond = unskippedtime * 60;
  // Calculate remaining seconds after subtraction
  let remainingSeconds;
  if (unskippedTimeSecond) {
    remainingSeconds = totalSeconds - unskippedTimeSecond;
  } else {
    remainingSeconds = totalSeconds;
  }
  // Calculate remaining hours
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  // Calculate remaining minutes
  const minutes = Math.floor(remainingSeconds / 60);

  // Calculate remaining seconds
  const seconds = Math.floor(remainingSeconds % 60);
  let formattedTime = '';
  if (hours > 0) {
    formattedTime += hours + 'h ';
  }
  if (minutes > 0) {
    formattedTime += minutes + 'm ';
  }
  if (seconds > 0) {
    formattedTime += seconds + 's';
  }
  return formattedTime.trim();
};
