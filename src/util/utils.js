const dateFormat = (dateObj, dateType) => {
  // 年月日yyyy-mm-dd
  const dateType1 = 'yyyy-MM-dd';
  // 年月日时分秒yyyy-mm-dd-hh-mm-ss
  const dateType2 = 'yyyy-MM-dd hh:mm:ss';
  // 时分秒hh-mm-ss
  const dateType3 = 'hh:mm:ss';

  if (dateObj === '' || dateObj === null) {
    return '';
  }

  let dateTime = '';
  const date = new Date(dateObj);
  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
  if (dateType === dateType1) {
    // 年月日yyyy-mm-dd
    dateTime = `${year}-${month}-${day}`;
  } else if (dateType === dateType2) {
    // 年月日时分秒yyyy-mm-dd-hh-mm-ss
    dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  } else if (dateType === dateType3) {
    // 时分秒hh-mm-ss
    dateTime = `${hour}:${minutes}:${seconds}`;
  }
  return dateTime;
};
export default { dateFormat };
