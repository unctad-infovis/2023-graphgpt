const formatNr = (x, separator = ',', unit = '', prefix = '', addComma = false, addPlus = false) => {
  let extra = '';
  if (addPlus === true && x > 0) {
    extra = '+';
  } else if (addPlus === true && x === 0) {
    extra = '±';
  }
  if (x < 0) {
    extra = '-';
  }
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator).replace(/-/g, '');
  if (addComma === true && x.indexOf('.') === -1) {
    x += '.0';
  }
  return x === '' ? 0 : extra + prefix + x + unit;
};
export default formatNr;
