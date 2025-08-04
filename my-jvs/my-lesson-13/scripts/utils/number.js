export function isValidProductNumber(number){
  const isNumber = (!isNaN(number)) && (number.trim() !== '');
  if (isNumber) {
    if (Number(number)>=0 && Number(number)<1000)
      return true;
    else 
      return false;
  }
  return false;
};