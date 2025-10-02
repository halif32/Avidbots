export const capitalizeFirstLetter = (item: any) => {
  if (typeof item === 'string') {
    if (item.includes('_')) {
      return item
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
  } else {
    return item; // return as it is if it's not a string
  }
};
