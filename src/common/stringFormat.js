export const convertToVNDFormat = ( valueInt ) => {
  const formatter = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(valueInt).substring(1);
}

export const convertVNDToInt = ( stringValue ) => {
  return parseInt(stringValue.replaceAll(",", ""));
}
