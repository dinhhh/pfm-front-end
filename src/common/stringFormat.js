export const convertToVNDFormat = ( valueInt ) => {
  // const formatter = new Intl.NumberFormat('vn-VN', {
  //   style: 'currency',
  //   currency: 'VND',
  // });
  // return formatter.format(valueInt).substring(1);
  var result;
  try {
    return result = valueInt.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
  } catch (e) {
    console.log("Exception in convert to vnd format: ", e);
  }
  return '0';
}

export const convertVNDToInt = ( stringValue ) => {
  return parseInt(stringValue.replaceAll(",", ""));
}
