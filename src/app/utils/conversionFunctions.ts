import moment from 'moment';

export const squareFeetToSquareMeters = (squareFeet: number) => {
  const squareMetersPerSquareFoot = 0.09290304;
  const squareMeters = squareFeet * squareMetersPerSquareFoot;
  return squareMeters.toFixed(2);
};

export const litersToGallons = (liters: number, unit: string | undefined) => {
  // Conversion factor
  if (unit !== 'litres') {
    const conversionFactor = 0.264172;
    // Convert liters to gallons
    const gallons = liters * conversionFactor;
    return gallons.toFixed(2);
  } else {
    return liters.toFixed(2);
  }
};

export const getDuration = (startTime: any, endTime: any) => {
  const result = moment.duration(moment(endTime).diff(moment(startTime)));
  let formatedDate;
  if (result.asMinutes() < 60) {
    formatedDate = result.minutes() + 'm ' + result.seconds() + 's ';
  }
  // If duration is less than a day
  else if (result.asHours() < 24) {
    formatedDate = result.hours() + 'h ' + result.minutes() + 'm ' + result.seconds() + 's';
  }
  // Duration is a day or more
  else {
    formatedDate = result.days() + 'd ' + result.hours() + 'h ' + result.minutes() + 'm ';
  }
  return formatedDate.split('-').join('');
};

export const convertTime = (data: any) => {
  const totalSeconds = Math.floor(data * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

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
